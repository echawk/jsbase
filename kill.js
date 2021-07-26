import * as os from "os";
import * as std from "std";

/*
Flags:
-s <signal> -- see signal(7)
*/

let sigdict = {
	"SIGHUP": 1,
	"SIGINT": 2,
	"SIGQUIT": 3,
	"SIGILL": 4,
	"SIGTRAP": 5,
	"SIGABRT": 6,
	"SIGBUS": 7,
	"SIGFPE": 8,
	"SIGKILL": 9,
	"SIGUSR1": 10,
	"SIGSEGV": 11,
	"SIGUSR2": 12,
	"SIGPIPE": 13,
	"SIGALRM": 14,
	"SIGTERM": 15,
	"SIGSTKFLT": 16,
	"SIGCHLD": 17,
	"SIGCONT": 18,
	"SIGSTOP": 19,
	"SIGTSTP": 20,
	"SIGTTIN": 21,
	"SIGTTOU": 22,
	"SIGURG": 23,
	"SIGXCPU": 24,
	"SIGXFSZ": 25,
	"SIGVTALRM": 26,
	"SIGPROF": 27,
	"SIGWINCH": 28,
	"SIGIO": 29,
	"SIGPWR": 30,
	"SIGSYS": 31,
	"SIGRTMIN": 35,
	"SIGRTMAX": 64,
};

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
	os.kill(pid, signal)
}
