require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const CARS_TABLE = 'cars';

const _resultRentalInfo = {
  carport_id: 1,
  carport_address: '愛知県名古屋市西区',
  share_car_id: 1,
  share_price: 330,
  car_id: 1,
  car_maker: 'トヨタ',
  car_name: 'クラウン',
  car_type: 'セダン',
  car_image_url1: '../../src/assets/CarImages/Crown_Ext.png',
  car_image_url2: '../../src/assets/CarImages/Crown_Int.png',
  rental_date: '2024-12-19T00:00:00.000Z',
  owner_rental_time: {
    strTime: '07:00',
    endTime: '23:00'
  },
  booking_time: [
    {
      strTime: '13:00',
      endTime: '20:00'
    },
  ]
}

module.exports = {
  CARS_TABLE,
  async get() {
    return await _resultRentalInfo;
  }
};
