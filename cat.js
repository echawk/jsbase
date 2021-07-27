import * as os from "os";
import * as std from "std";
import * as util from "./util.js";

var args = scriptArgs.slice(1)
var i = 0
var files = []

/* Parse arguments */
while (i < args.length) {
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
	i++
}

var outbuffer = []
/* if no files, act on standard input */
if (files.length == 0) {
	var lines = util.readStdinAsLines()
	i = 0
	while (i < lines.length) {
		print(lines[i])
		i++
	}
} else {
	i = 0
	while (i < files.length) {
		var lines = util.readFileAsLines(files[i])
		for (var j = 0; j < lines.length; j++) {
			outbuffer.push(lines[j])
		}
		i++
	}
	i = 0
	while (i < outbuffer.length) {
		print(outbuffer[i])
		i++
	}
}
