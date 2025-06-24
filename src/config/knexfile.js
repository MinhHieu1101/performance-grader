module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5433,
      user: process.env.DB_USER || "myuser",
      password: process.env.DB_PASS || "mypassword",
      database: process.env.DB_NAME || "myproject_dev",
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
  },
};
