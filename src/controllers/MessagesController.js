const config = require("../DB/sqlite3Config");
const knex = require("knex")(config);
const { logApiError } = require("../utils/logger");

class MessagesApi {
  async save(message) {
    try {
      const newMewssageId = await knex("messages").insert(message);
      return await knex("messages").where("id", newMewssageId);
    } catch (error) {
      const errorMessage = `Ha ocurrido un error escribiendo los datos: ${error.message}`;
      logApiError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getAll() {
    try {
      const messages = await knex("messages");
      return messages;
    } catch (error) {
      const errorMessage = `Ha ocurrido un error obteniendo los datos: ${error.message}`;
      throw new Error(errorMessage);
    }
  }
}

module.exports = MessagesApi;
