/* Para que la aplicación funcione se debe tener una base de datos sql llamada "productsdb" en localhost, correr los scripts para crear las tablas necesarias, y poder conectarse a una base de datos de Mongo llamada productsdb también en localhost, con usuario root y sin contraseña */
const cluster = require("cluster");
const {cpus} = require("os");
const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const compression = require("compression")
require("dotenv").config();
const passport = require("./src/utils/passport");
const socketConfig = require("./src/utils/socket");
const router = require("./src/routes");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: ["http://localhost/4000"]
    }
});
require("./src/DB/mongoConnection");

const {port, modo} = require('./src/utils/minimist')
const {allRequests, logRequestInfo} = require("./src/utils/logger");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        cookie: {
            maxAge: 600000
        },
        secret: "secreto",
        rolling: true,
        resave: true,
        saveUninitialized: true
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("./public"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/src/views");

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials"
    })
);

/*  Config del socket  */
socketConfig(io);

/*  Gzip  */
app.use(compression())

app.use("/", router);

/*   Cluster   */
if (modo === "cluster" && cluster.isMaster) {
    console.log("Modo:", modo);
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
        console.log(`CPU: ${i}`);
    }
    cluster.on("exit", (worker) => {
        console.log(`El proceso ${worker.process.pid} terminó`);
        cluster.fork();
    });
} else {
    process.on("exit", (code) => {
        console.log(`El proceso ${process.pid} terminó con código ${code}`);
    });

    httpServer.listen(port, () =>
        console.log("Servidor activo en puerto: " + port)
    );
}
