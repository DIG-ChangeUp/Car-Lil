require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const USERS_TABLE = 'users';

module.exports = {
  USERS_TABLE,
  async all(limit) {
    return await db(USERS_TABLE).limit(limit);
  },
  async findById(id) {
    return await db(USERS_TABLE).where({ id });
  },
  async findByEmail(email) {
    return await db(USERS_TABLE).where({ email });
  },
  async save(data) {
    await db.table(USERS_TABLE).insert(data);
    return this.find(data.id);
  },
};
