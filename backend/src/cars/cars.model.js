require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const CARS_TABLE = 'cars';

module.exports = {
  CARS_TABLE,
  async all(limit) {
    return await db(CARS_TABLE).limit(limit);
  },
  async find(id) {
    return await db(CARS_TABLE).where({ id });
  },
};
