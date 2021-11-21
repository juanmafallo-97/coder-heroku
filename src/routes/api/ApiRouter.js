const router = require("express").Router();
const testProductsRouter = require("./TestProductsRouter");
const productsRouter = require("./ProductsRouter");
const infoRouter = require("./InfoRouter");

router.use("/productos-test", testProductsRouter);
router.use("/productos", productsRouter);
router.use("/info", infoRouter);

module.exports = router;
