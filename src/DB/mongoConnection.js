require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://coder:coder321@cluster0.jiiuc.mongodb.net/coder-heroku?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB exitosamente");
});
mongoose.connection.on("error", (err) => {
  console.log("Error conectando a MongoDB", err);
});

module.exports = mongoose.connection;
