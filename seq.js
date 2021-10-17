import * as os from "os";
import * as std from "std";

if(scriptArgs.length < 2) {
	std.exit(1)
} else {
	switch (scriptArgs.length) {
		case 2:
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
			break;
		case 3:
			var i = scriptArgs[1]
			var toNum = scriptArgs[2]
			while (i <= toNum) {
				std.printf("%d\n", i)
				i++
			}
			break;
		case 4:
			var i = Number.parseInt(scriptArgs[1])
			var step = Number.parseInt(scriptArgs[2])
			var toNum = Number.parseInt(scriptArgs[3])
			while (i <= toNum) {
				std.printf("%d\n", i)
				i = i + step
			}
			break;
		default:
			break;
	}
}
