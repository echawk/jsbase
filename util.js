import * as os from "os";
import * as std from "std";

export function readFileAsLines(filepath) {
	var retbuffer = [] /* list of lines: return value */

	var file = std.open(filepath, "r")
	if (file == null) {
		std.exit(1)
	}
	while (!file.eof()) {
		var l = file.getline()
		if (l != null) {
			retbuffer.push(l)
		}
	}
	file.close()
	return retbuffer
}

export function readLinesFromFile(filepath, numLines) {
	let retbuffer = [] /* list of lines: return value */

	let file = std.open(filepath, "r")
	if (file == null) {
		std.exit(1)
	}
	let i = 0
	while (i < numLines && !file.eof()) {
		let l = file.getline()
		if (l != null) {
			retbuffer.push(l)
		}
		i++
	}
	file.close()
	return retbuffer
}

export function readStdinAsLines() {
	var stdin_string = std.in.readAsString()
	var lines = stdin_string.split("\n")
	var lastLine = lines.pop()
	/* if the last line is not a trailing newline,
		add it back to the lines array */
	if (lastLine != "") {
		lines.push(lastLine)
	}
	return lines
}

