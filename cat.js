import * as os from "os";
import * as std from "std";
import * as util from "./util.js";

var args = scriptArgs.slice(1)
var files = []

/* Parse arguments */
for (let i = 0; i < args.length; i++) {
	if (args[i] == "-V") {
		std.exit(0)
	} else if (args[i] == "-h") {
		std.exit(1)
		/* FIXME: implement spec */
	} else if (args[i] == "-u") {
		std.exit(1)
	} else {
		files.push(args[i])
	}
}

var outbuffer = []
/* if no files, act on standard input */
if (files.length == 0) {
	var lines = util.readStdinAsLines()
	for (let i = 0; i < lines.length; i++) {
		print(lines[i])
	}
} else {
	for (let i = 0; i < files.length; i++) {
		var lines = util.readFileAsLines(files[i])
		for (var j = 0; j < lines.length; j++) {
			outbuffer.push(lines[j])
		}
	}
	for (let i = 0; i < outbuffer.length; i++) {
		print(outbuffer[i])
	}
}
