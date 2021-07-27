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

export function readStdinAsLines() {
	var stdin_string = std.in.readAsString()
	return stdin_string.split("\n")
}

