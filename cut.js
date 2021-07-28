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
let keep_greater_than_equal
let keep_less_than_equal

function parseFieldArg (arg) {
	let comma_split_arg = arg.split(",")
	for (let i = 0; i < comma_split_arg.length; i++) {
		if (comma_split_arg[i].includes("-")) {
			if (comma_split_arg[i].startsWith("-")) {
				keep_less_than_equal = Number.parseInt(comma_split_arg[i][1])
			} else if (comma_split_arg[i].endsWith("-")) {
					/* FIXME: follow spec */
					keep_greater_than_equal = Number.parseInt(comma_split_arg[i][0])
			} else {
				let dash_split_arg = comma_split_arg[i].split("-")
				for (let i = Number.parseInt(dash_split_arg[0]); i <= Number.parseInt(dash_split_arg[1]); i++) {
					fields.push(i)
				}
			}
		} else {
			fields.push(Number.parseInt(comma_split_arg[i]))
		}
	}
	/* I think a good return value for this function would be a function that when given a number,
	tells you whether or not a field is to be included in the final output or not */
	return (number) => {
		if (fields.includes(number)) {
			return true
		} else {
			if (number >= keep_greater_than_equal) {
				return true
			}
			if (number <= keep_less_than_equal) {
				return true
			}
		}
		return false
	};
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
			let f = parseFieldArg(args[i].replace("-f", ""))
		} else {
			i++
			if (i < args.length) {
				parseFieldArg(args[i])
				if(isFinite(args[i])) {
					field = Number.parseInt(args[i]) - 1
				}
			}
		}
	} else if (args[i].startsWith("-c")) {
		/* FIXME: follow spec */
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
