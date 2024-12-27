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
  async findByEmail(email) {
    return await db(USERS_TABLE).where({ email });
  },
  //emailからオーナーに紐づくすべての情報を取得
  async findOwnerByEmail(email) {
    return await db(USERS_TABLE)
      .leftJoin('share_cars', 'users.id', 'share_cars.user_id')
      .leftJoin('cars', 'share_cars.car_id', 'cars.id')
      .leftJoin('carports', 'share_cars.carport_id', 'carports.id')
      .leftJoin('share', 'users.id', 'share.user_id')
      .select(
        // 'users.id',
        'share_cars.user_id',
        'users.user_name',
        'users.email',
        'users.user_type',
        'share_cars.car_id',
        'cars.car_name',
        'cars.maker',
        'cars.car_type',
        'cars.capacity',
        'share_cars.share_prise',
        'share_cars.share_state',
        'cars.photo_url',
        'share_cars.carport_id',
        'carports.address',
        'carports.latitude',
        'carports.longitude',
        'share.share_car_id',
        'share.start_at',
        'share.end_at'
      )
      .where({ email });
  },
  //emailからユーザーに紐づくすべての情報を取得
  async findTenantByEmail(email) {
    return await db(USERS_TABLE)
      .leftJoin('reservations', 'users.id', 'reservations.user_id')
      .leftJoin('share_cars', 'reservations.share_car_id', 'share_cars.id')
      .leftJoin('cars', 'share_cars.car_id', 'cars.id')
      .leftJoin('carports', 'share_cars.carport_id', 'carports.id')
      .leftJoin('share', 'share_cars.user_id', 'share.user_id')
      .select(
        // 'users.id',
        'reservations.user_id',
        'users.user_name',
        'users.email',
        'users.user_type',
        'reservations.share_state',
        'reservations.reserved_at',
        'reservations.rent_at',
        'reservations.rented_at',
        'reservations.return_at',
        'reservations.returned_at',
        'reservations.evaluation',
        // 'share_cars.car_id',
        'cars.car_name',
        'cars.maker',
        'cars.car_type',
        'cars.capacity',
        'share_cars.share_prise',
        // 'share_cars.share_state',
        'cars.photo_url',
        // 'share_cars.carport_id',
        'carports.address',
        'carports.latitude',
        'carports.longitude',
        'share.start_at',
        'share.end_at'
      )
      .where({ email });
  },
  async save(data) {
    const [result] = await db.table(USERS_TABLE).insert(data).returning('*');
    return result;
  },

  async edit(data) {
    const [result] = await db
      .table(USERS_TABLE)
      .where({ email: data.email })
      .update({ user_type: data.user_type })
      .returning('*');
    return result;
  },
};
