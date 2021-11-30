const Product = require("../models/Product");
const { logApiError } = require("../utils/logger");

class ProductsController {
  async save(product) {
    try {
      const newProduct = await Product.create(product);
      return newProduct;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error escribiendo los datos:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getById(id) {
    try {
      const product = await Product.findById(id);
      if (product.length === 0)
        throw new Error("No existe el producto con el id especificado");
      return product;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error obteniendo los datos:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getAll() {
    try {
      const allProducts = await Product.find();
      return allProducts;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error obteniendo los datos:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      await Product.findByIdAndUpdate(id, updatedProduct);
      const newProduct = await Product.findById(id);
      return newProduct;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error actualizando el producto:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async deleteById(id) {
    try {
      const productToDelete = await Product.findById(id);
      if (!productToDelete)
        throw new Error("No existe el producto con el id especificado");
      await findByIdAndDelete(id);
    } catch (error) {
      const errorMessage = `Ha ocurrido un error borrando el producto:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

module.exports = ProductsController;
