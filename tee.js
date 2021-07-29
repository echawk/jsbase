import * as os from "os";
import * as std from "std";
import * as util from "./util.js";

var args = scriptArgs.slice(1)
let file_mode = "w"
var files = []

/* Parse arguments */
for (let i = 0; i < args.length; i++) {
	if (args[i] == "-V") {
		std.exit(0)
	} else if (args[i] == "-h") {
		std.exit(1)
	} else if (args[i] == "-a") {
		file_mode = "a"
	} else if (args[i] == "-i") {
		os.signal(os.SIGINT, null)
	} else {
		files.push(args[i])
	}
}

var outbuffer = []
let lines = util.readStdinAsLines()
for (let i = 0; i < lines.length; i++) {
	outbuffer.push(lines[i])
}

var wfiles = {}
for (let j = 0; j < files.length; j++) {
	wfiles[files[j].toString()] = std.open(files[j], file_mode)
	if (wfiles[files[j].toString()] == null) {
		std.exit(1)
	}
}

for (let i = 0; i < outbuffer.length; i++) {
	print(outbuffer[i])
	for (var key in wfiles) {
		wfiles[key].printf("%s\n", outbuffer[i])
	}
}

for (var key in wfiles) {
	wfiles[key].close()
}
