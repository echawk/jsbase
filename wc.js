import * as os from "os";
import * as std from "std";

/*
Flags:
-l -- print number of newline characters
*/


var args = scriptArgs.slice(1)
var i = 0
var signal;
var pids = [];
while (i < args.length) {
	if (args[i] == "-s") {
		i++
		if (i < args.length) {
			if (isFinite(args[i])) {
				signal = args[i]
			}
			if (args[i] in sigdict) {
				signal = sigdict[args[i]]
			}
		}
	} else if (isFinite(args[i])) {
		if(!pids.includes(args[i])) {
			pids.push(args[i])
		}
	}
	i++
}

/* if signal wasn't defined or we don't have any pids to kill */
if (isNaN(signal) || pids.length == 0 ){
	std.exit(1)
}

std.printf("%d %s", signal, pids)
for (var pid in pids) {
}
