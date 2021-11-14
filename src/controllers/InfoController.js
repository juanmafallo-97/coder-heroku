const {cpus} = require('os');
const minimist = require("minimist");

const getInfo = (req, res) => {
    const allArgs = minimist(process.argv.slice(2));
    const args = allArgs._;
    for (const arg in allArgs) {
        if (arg !== "_") {
            args.push(` ${arg}: ${allArgs[arg]}`);
        }
    }
    const os = process.platform;
    const numCpus = cpus().length;
    const nodeVersion = process.version;
    const memoryUsage = process.memoryUsage().rss;
    const path = __dirname;
    const processId = process.pid;
    const workingDirectory = process.cwd();

    res.render("info", {
        args,
        os,
        numCpus,
        nodeVersion,
        memoryUsage,
        path,
        processId,
        workingDirectory
    });
};

module.exports = {getInfo};
