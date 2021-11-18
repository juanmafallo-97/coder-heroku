const config = require("../DB/mariadbConfig");
const knex = require("knex")(config);
const { logApiError } = require("../utils/logger");

class ProductsController {
  async save(product) {
    try {
      const newProductId = await knex("products").insert(product);
      return await knex("products").where("id", newProductId);
    } catch (error) {
      const errorMessage = `Ha ocurrido un error escribiendo los datos:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getById(id) {
    try {
      const product = await knex("products").where("id", id);
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
      const allProducts = await knex("products");
      return allProducts;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error obteniendo los datos:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      await knex("products").where("id", id).update(updatedProduct);
      return knex("products").where("id", id);
    } catch (error) {
      const errorMessage = `Ha ocurrido un error actualizando el producto:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async deleteById(id) {
    try {
      const deletedProduct = await knex("products").where("id", id).del();
      if (!deletedProduct)
        throw new Error("No existe el producto con el id especificado");
    } catch (error) {
      const errorMessage = `Ha ocurrido un error borrando el producto:  ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

module.exports = ProductsController;
