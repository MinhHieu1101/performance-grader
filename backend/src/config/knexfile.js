require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 5 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
      extension: "js",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
      extension: "js",
    },
  },
};
