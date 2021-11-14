require("dotenv").config();

const config = {
  client: "mysql2",
  connection: {
    host: process.env.MARIADB_HOST,
    user: "newuser",
    password: "password",
    database: process.env.MARIADB_DATABASE
  }
};

module.exports = config;
