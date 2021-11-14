const minimist = require("minimist");

const minimistOptions = {
    alias: {
        p: "port",
        m: "modo"
    },
    default: {
        port: 9090,
        modo: "fork"
    }
};

const {port, modo} = minimist(process.argv.slice(2), minimistOptions);

module.exports = {
    port,
    modo
}