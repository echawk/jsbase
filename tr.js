import * as os from "os";
import * as std from "std";

var buffer = new ArrayBuffer();
std.in.read(buffer)
console.log(buffer.valueOf())

