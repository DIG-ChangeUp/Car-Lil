require('dotenv').config();
const config = require('./knexfile');
const knex = require('knex');
const environment = process.env.NODE_ENV;
const knexConfig = config[environment];
module.exports = knex(knexConfig);
