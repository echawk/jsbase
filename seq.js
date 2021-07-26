import * as os from "os";
import * as std from "std";

if(scriptArgs.length < 2) {
	std.exit(1)
} else {
	let args = scriptArgs.slice(1)
	var i = 0
	/* FIXME: handle flags (-s, -w) */
	while (!isFinite(args[i])) {
		i++
		continue
	}
	var toNum = args[i]
	i = 1
	while(i <= toNum) {
		std.printf("%d\n", i)
		i++
	}
}
