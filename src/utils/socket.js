const ProductsController = require("../controllers/ProductsController");
const MessagesController = require("../controllers/MessagesController");

const productsController = new ProductsController();
const messagesController = new MessagesController();

module.exports = function socketConfig(io) {
  io.on("connection", async (socket) => {
    console.log("Usuario conectado");

    //Manejo de productos
    const products = await productsController.getAll();
    socket.emit("products", products);

    socket.on("new-product", async (product) => {
      await productsController.save(product);
      const updatedProducts = await productsController.getAll();
      io.sockets.emit("products", updatedProducts);
    });

    //Manejo de mensajes
    const messages = await messagesController.getAll();
    socket.emit("messages", messages);

    socket.on("new-message", async (message) => {
      await messagesController.save(message);
      const updatedMessages = await messagesController.getAll();
      io.sockets.emit("messages", updatedMessages);
    });
  });
};
