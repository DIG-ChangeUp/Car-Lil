require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const SHARE_TABLE = 'share';

module.exports = {
  SHARE_TABLE,
  //登録
  async save(data) {
    const [result] = await db.table(SHARE_TABLE).insert(data).returning('*');
    return result;
  },

  async findByShareCarId(share_car_id) {
    return db(SHARE_TABLE).where({ share_car_id }).orderBy('start_at');
  },
};
