const winston  = require("winston")

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({level: "info"}),
        new winston.transports.File({filename: "warn.log", level: "warn"}),
        new winston.transports.File({filename: "error.log", level: "error"})
    ]
});

const logRequestInfo = (req, next) => {
    logger.log("info", `Ruta: ${req.originalUrl} , Método: ${req.method}`)
    next()
}

const logNonExistentRoute = (req) => logger.log("warn", `Ruta inexistente: ${req.originalUrl} , Método: ${req.method}`)

const logApiError = (error) => logger.log("error", error)

module.exports = {logRequestInfo, logNonExistentRoute, logApiError}