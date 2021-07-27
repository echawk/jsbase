import * as os from "os";
import * as std from "std";
import * as util from "./util.js";

let args = scriptArgs.slice(1)
let numLines = -1 /* -1 by default means all lines */
let files = []    /* files where to source potential lines from*/

/* Parse arguments */
for (let i = 0; i < args.length; i++) {
	if (args[i].startsWith("-e")) {
		/* Treat args as lines */
	} else if (args[i].startsWith("-n")) {
		/* output at most NUM lines */
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
	}else {
		files.push(args[i])
	}
}

if (files.length == 0) {
	let lines = util.readStdinAsLines()
	util.printNLines(lines, (numLines > lines.length ? lines.length : numLines))
} else if (files.length == 1) {
	let lines = util.readLinesFromFile(files[0], numLines)
	util.printLines(lines)
} else {
	for (let i = 0; i < files.length; i++) {
		if (i == 0) {
			std.printf("==> %s <==\n", files[i])
		} else {
			std.printf("\n==> %s <==\n", files[i])
		}
		let lines = util.readLinesFromFile(files[i], numLines)
		util.printLines(lines)
	}
}
