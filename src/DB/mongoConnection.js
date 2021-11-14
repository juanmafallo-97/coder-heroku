//Conexión a la base de datos para mantener usuarios
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB exitosamente");
});
mongoose.connection.on("error", (err) => {
  console.log("Error conectando a MongoDB", err);
});

module.exports = mongoose.connection;
