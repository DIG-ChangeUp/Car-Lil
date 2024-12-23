require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const CARPORTS_TABLE = 'carports';

module.exports = {
  CARPORTS_TABLE,
  async all(limit) {
    return await db(CARPORTS_TABLE).limit(limit);
  },
  async find(id) {
    return await db(CARPORTS_TABLE).where({ id });
  },
  async save(data) {
    await db.table(CARPORTS_TABLE).insert(data);
    return this.find(data.id);
  },
  async calcDistance(currentPosition) {
    return await db(CARPORTS_TABLE)
      .select(
        '*',
        //db.rawで計算式をクオーテーションで囲って直接入れる
        // 参考：https://knexjs.org/guide/raw.html#raw-parameter-binding
        db.raw(
          //テーブルに無い列は"?"で仮置き
          `6371 * ACOS(COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) + SIN(RADIANS(?)) * SIN(RADIANS(latitude))) AS distance`,
          //仮置きした"?"の順番通りに値を配列で入れる
          [
            currentPosition.latitude,
            currentPosition.longitude,
            currentPosition.latitude,
          ]
        )
      )
      .orderBy('distance', 'asc');
  },
};
