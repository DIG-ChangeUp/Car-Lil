require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const RESERVATIONS_TABLE = 'reservations';

module.exports = {
  RESERVATIONS_TABLE,

  async findByEmail(email) {
    return await db(RESERVATIONS_TABLE).where({ email });
  },
  //!!!発表用にでもテーブルからidでデータを検索
  async findById(id) {
    return await db('demo_reservations').where({ id });
  },
  //!!!発表用にdemo_reservationsテーブルにデータ挿入---------
  async save(data) {
    const [result] = await db
      // .table(RESERVATIONS_TABLE)
      .table('demo_reservations')
      .insert(data)
      .returning('*');
    return result;
  },
  async findByUserId(user_id) {
    return db(RESERVATIONS_TABLE)
      .select(
        `${RESERVATIONS_TABLE}.id`,
        `${RESERVATIONS_TABLE}.share_car_id`,
        `${RESERVATIONS_TABLE}.reserved_at`,
        `${RESERVATIONS_TABLE}.rent_at`,
        'share_cars.user_id as owner_user_id',
        'cars.car_name',
        'carports.address'
      )
      .where(`${RESERVATIONS_TABLE}.user_id`, user_id)
      .join(
        'share_cars',
        `${RESERVATIONS_TABLE}.share_car_id`,
        'share_cars.car_id'
      )
      .join('cars', `share_cars.car_id`, 'cars.id')
      .join('carports', 'share_cars.user_id', 'carports.user_id')
      .orderBy('rent_at');
  },

  async findByShareCarId(share_car_id) {
    return db(RESERVATIONS_TABLE).where({ share_car_id }).orderBy('rent_at');
  },
};
