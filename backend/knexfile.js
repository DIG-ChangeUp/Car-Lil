// Update with your config settings.
require ('dotenv').config({ path: "./.env" })
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_URL = process.env.DB_URL;
const DB_PASSWORD = process.env.DB_PASSWORD
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  // staging: {
  //   client: 'pg',
  //   connection: DB_URL,
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  // },

  production: {
    client: 'pg',
    connection: DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }

};
