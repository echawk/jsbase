import * as os from "os";
import * as std from "std";

let args = scriptArgs.slice(1)
if (args.length <= 2) {
	let string = args[0]
	if (string == null) {
		std.exit(1)
	} else {
		if (string == "//") {
			std.printf("/\n")
			std.exit(0)
		} else if (string.replaceAll("/", "") == "") {
			std.printf("/\n")
			std.exit(0)
		}
		string = string.endsWith("/") ? string.substring(0, string.length - 1) : string
		string = string.includes("/") ? string.slice(string.lastIndexOf("/") + 1) : string
		if (args.length == 2) {
			let suffix = args[1]
			string = string.endsWith(suffix) ? string.substring(0, string.lastIndexOf(suffix)) : string
		}
		std.printf("%s\n", string)
	}
} else {
	std.exit(1)
}
