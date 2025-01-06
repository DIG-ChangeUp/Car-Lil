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
  async findByUserId(user_id) {
    return db(RESERVATIONS_TABLE)
      .where(`${RESERVATIONS_TABLE}.user_id`, user_id)
      .leftJoin(
        'share_cars',
        `${RESERVATIONS_TABLE}.share_car_id`,
        'share_cars.car_id'
      )
      .leftJoin('cars', `${RESERVATIONS_TABLE}.share_car_id`, 'cars.id')
      .leftJoin('carports', 'share_cars.user_id', 'carports.user_id')
      .orderBy('rent_at');
  },

  async findByShareCarId(share_car_id) {
    return db(RESERVATIONS_TABLE).where({ share_car_id }).orderBy('rent_at');
  },
};
