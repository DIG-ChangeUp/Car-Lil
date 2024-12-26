require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const RESERVATIONS_TABLE = 'reservations';

module.exports = {
  RESERVATIONS_TABLE,

  async find(email) {
    return await db(RESERVATIONS_TABLE).where({});
  },
};
