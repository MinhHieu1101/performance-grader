// src/config/knexInstance.js
require("dotenv").config();
const { knex } = require("knex");
const config = require("./knexfile");

const environment = process.env.NODE_ENV || "development";
const knexInstance = knex(config[environment]);

module.exports = knexInstance;
