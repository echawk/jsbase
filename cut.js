import * as os from "os";
import * as std from "std";
import * as util from "./util.js";
/* cut -d',' -f2 -- DELIM=, FIELD=2 */
/*
cut's flags all start with a dash, then are followed by a letter
with the option to each flag, being the next value
*/
var args = scriptArgs.slice(1)
var delimiter
var field // will need to make an array to follow spec
var files = []
let fields = [] /* I think it will be easier to list the fields to *drop* rather than to list the fields to keep*/

function parseFieldArg (arg) {
	let comma_split_arg = arg.split(",")
	for (let i = 0; i < comma_split_arg.length; i++) {
		if (comma_split_arg[i].includes("-")) {
			if (comma_split_arg[i].startsWith("-")) {
				for (let i = 1; i <= Number.parseInt(dash_split_arg[1]); i++) {
					fields.push(i)
				}
			} else if (comma_split_arg[i].startsWith("-")) {
					/* FIXME: follow spec */
			} else {
				let dash_split_arg = comma_split_arg[i].split("-")
				for (let i = Number.parseInt(dash_split_arg[0]); i <= Number.parseInt(dash_split_arg[1]); i++) {
					print(i)
					fields.push(i)
				}
			}
		} else {
			fields.push(Number.parseInt(comma_split_arg[i]))
		}
	}
}

/* Parse arguments */
for (let i = 0; i < args.length; i++) {
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
			parseFieldArg(args[i].replace("-f", ""))
		} else {
			i++
			if (i < args.length) {
				parseFieldArg(args[i])
				if(isFinite(args[i])) {
					field = Number.parseInt(args[i]) - 1
				}
			}
		}
	} else if (args[i] == "-") {
		/* FIXME: follow spec */
	} else {
		files.push(args[i])
	}
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
	for (let i = 0; i < lines.length; i++) {
		outbuffer.push(lines[i].split(delimiter)[field])
	}
} else {
	for (let i = 0; i < files.length; i++) {
		let lines = util.readFileAsLines(files[i])
		for (let j = 0; j < lines.length; j++) {
			outbuffer.push(lines[j].split(delimiter)[field])
		}
	}
}

util.printLines(outbuffer)
