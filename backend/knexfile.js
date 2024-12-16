// Update with your config settings.
require ('dotenv').config({ path: "./.env" })
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PORT = process.env.DB_PORT
const DATABASE_URL = process.env.DATABASE_URL;
const DB_CONNECTION = process.env.DB_CONNECTION
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DATABASE_URL
const DB_HOST = process.env.DB_HOST


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
    client: DB_CONNECTION,
    connection: {
      URI: DATABASE_URL,
      Database: DB_DATABASE,
      Host: DB_HOST,
      Password: DB_PASSWORD,
      User: DB_USERNAME
    },
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
