import * as os from "os";
import * as std from "std";
import * as util from "./util.js";
/* cut -d',' -f2 -- DELIM=, FIELD=2 */
/*
cut's flags all start with a dash, then are followed by a letter
with the option to each flag, being the next value
*/
var args = scriptArgs.slice(1)
var i = 0
var delimiter
var field // will need to make an array to follow spec
var files = []

/* Parse arguments */
while (i < args.length) {
	if (args[i].startsWith("-d")) {
		if (!(args[i].replace("-d", "") == "")) {
			delimiter = args[i].replace("-d", "")
		} else {
			i++
			if (i < args.length) {
				delimiter = args[i]
			}
		}
	} else if (args[i].startsWith("-f")) {
		if (!(args[i].replace("-f", "") == "")) {
			/* FIXME: follow spec */
			field = Number.parseInt(args[i].replace("-f", "")) - 1
		} else {
			i++
			if (i < args.length) {
				if(isFinite(args[i])) {
					field = Number.parseInt(args[i]) - 1
				}
			}
		}
	} else {
		files.push(args[i])
	}
	i++
}
/* by default, the delmiting character is a tab */
if (delimiter == "") {
	delimiter = "\t"
}

//std.printf("DELIM: '%s' \nFIELD: '%s' \nFILES: '%s'\n", delimiter, field, files)

/* if we don't have a field, error out */
if (field < 0){
	std.exit(1)
}

/* We should now be ready to parse stdin or the provided files */

var outbuffer = []
/* if no files, act on standard input */
if (files.length == 0) {
	var lines = util.readStdinAsLines()
	i = 0
	while (i < lines.length) {
		outbuffer.push(lines[i].split(delimiter)[field])
		i++
	}
} else {
	i = 0
	while (i < files.length) {
		var file = std.open(files[i], "r")
		if (file == null) {
			std.exit(1)
		}
		while (!file.eof()) {
			var l = file.getline()
			if (l != null) {
				outbuffer.push(l.split(delimiter)[field])
			}
		}
		file.close()
		i++
	}
}

i = 0
while (i < outbuffer.length) {
	print(outbuffer[i])
	i++
}
