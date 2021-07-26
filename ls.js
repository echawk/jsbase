import * as os from "os";
import * as std from "std";

class fnode {
	constructor(path) {
		this.path = path;
	}
}

	var file = new fnode(os.getcwd()[0][2])
	//console.log(file)
	std.printf("%s", os.readdir(os.getcwd()[0]).join("\n"))
