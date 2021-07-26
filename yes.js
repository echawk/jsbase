import * as std from "std";
while(true) {
	if(scriptArgs.length < 2) {
		std.printf("yes\n")
	} else {
		std.printf("%s\n", scriptArgs.slice(1))
	}
}
