const knex = require("knex");

const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);
// const db = knex(knexConfig.staging);

module.exports = db