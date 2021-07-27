import * as os from "os";
import * as std from "std";

export function getFileAsLines(filepath) {
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

