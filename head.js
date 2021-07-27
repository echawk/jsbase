import * as os from "os";
import * as std from "std";
import * as util from "./util.js";

var args = scriptArgs.slice(1)
var numLines = 10
var files = []

/* Parse arguments */
for (var i = 0; i < args.length; i++) {
	if (args[i].startsWith("-n")) {
		if (args[i].replace("-n", "") != "") {
			numLines = Number.parseInt(args[i].replace("-n", ""))
		} else {
			i++
			if (i < args.length) {
				if(isFinite(args[i])) {
					numLines = Number.parseInt(args[i])
				}
			}
		}
	} else {
		files.push(args[i])
	}
}

function printNlines(input, n){
	for (var i = 0; i < n; i++) {
		std.printf("%s\n", input[i])
	}
}

if (files.length == 0) {
	var lines = util.readStdinAsLines()
	printNlines(lines, (numLines > lines.length ? lines.length : numLines))
} else if (files.length == 1) {
	var lines = util.readFileAsLines(files[0])
	printNlines(lines, (numLines > lines.length ? lines.length : numLines))
} else {
	for (var i = 0; i < files.length; i++) {
		if (i == 0) {
			std.printf("==> %s <==\n", files[i])
		} else {
			std.printf("\n==> %s <==\n", files[i])
		}
		var lines = util.readFileAsLines(files[i])
		printNlines(lines, (numLines > lines.length ? lines.length : numLines))
	}
}
