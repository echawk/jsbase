import * as os from "os";
import * as std from "std";

if(scriptArgs.length < 2) {
	std.exit(1)
} else {
	let args = scriptArgs.slice(1)
	var i = 0
	/* FIXME: handle more than seconds!!! */
	while (!isFinite(args[i]) && i < args.length) {
		i++
		continue
	}
	/* if we were unable to find any numbers (see above FIXME)*/
	if (i > args.length) {
		std.exit(1)
	}
	var seconds = Number.parseInt(args[i])
	os.sleep(seconds * 1000) /* os.sleep expects milliseconds, so multiply by 1000 */
	std.exit(0)
}
