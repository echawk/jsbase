import * as os from "os";
import * as std from "std";

var args = scriptArgs.slice(1)
var i = 0
var files = []

/* Parse arguments */
while (i < args.length) {
	if (args[i] == "-V") {
		std.exit(0)
	} else if (args[i] == "-h") {
		std.exit(1)
	} else {
		files.push(args[i])
	}
	i++
}

var outbuffer = []
/* if no files, act on standard input */
if (files.length == 0) {
	var input = std.in.readAsString()
	var lines = input.split("\n")
	i = 0
	while (i < lines.length) {
		outbuffer.push(lines[i].split("").reverse().join(""))
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
				outbuffer.push(l.split("").reverse().join(""))
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
