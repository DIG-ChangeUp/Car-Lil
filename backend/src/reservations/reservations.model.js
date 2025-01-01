require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const RESERVATIONS_TABLE = 'reservations';

module.exports = {
  RESERVATIONS_TABLE,

  async findById(id) {
    return await db(RESERVATIONS_TABLE).where({ id });
  },
  async findByEmail(email) {
    return await db(RESERVATIONS_TABLE).where({ email });
  },
  async save(data) {
    const [result] = await db
      .table(RESERVATIONS_TABLE)
      .insert(data)
      .returning('*');
    return result;
  },
};
