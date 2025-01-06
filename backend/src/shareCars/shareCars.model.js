require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const SHARE_CARS_TABLE = 'share_cars';

module.exports = {
  SHARE_CARS_TABLE,
  async all(limit) {
    return await db(SHARE_CARS_TABLE).limit(limit);
  },
  async findByShareCarId(id) {
    return await db(SHARE_CARS_TABLE).where({ id });
  },
  //!!!シェアカー自体のIDではなくユーザーIDで検索するので注意
  async findByUserId(userId) {
    return await db(SHARE_CARS_TABLE).where({ user_id: userId });
  },
  async editShareState(shareState, shareCarId) {
    const [result] = await db(SHARE_CARS_TABLE)
      .update({ share_state: shareState })
      .where({ id: shareCarId })
      .returning('share_state');
    return result;
  },
};
