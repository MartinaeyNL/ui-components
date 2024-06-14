const { spawn } = require("node:child_process");

async function executeCmd(command, args, cwd, env, doLogging) {
    const ls = spawn(command, args, { cwd: cwd, env: { ...process.env, ...env }, shell: true })
    if(doLogging) {
        ls.stdout.pipe(process.stdout);
    }
    for await (const data of ls.stdout) {}
}

module.exports = {
    executeCmd: executeCmd
}