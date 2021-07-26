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
		/* FIXME: implement spec */
	} else if (args[i] == "-a") {
		std.exit(1)
	} else {
		files.push(args[i])
	}
	i++
}

var outbuffer = []
var input = std.in.readAsString()
var lines = input.split("\n")
i = 0
while (i < lines.length) {
	outbuffer.push(lines[i])
	i++
}

var j = 0
var wfiles = {}
while (j < files.length) {
	wfiles[files[j].toString()] = std.open(files[j], "w")
	if (wfiles[files[j].toString()] == null) {
		std.exit(1)
	}
	j++
}

i = 0
while (i < outbuffer.length) {
	print(outbuffer[i])
	for (var key in wfiles) {
		wfiles[key].printf("%s\n", outbuffer[i])
	}
	i++
}

for (var key in wfiles) {
	wfiles[key].close()
}
