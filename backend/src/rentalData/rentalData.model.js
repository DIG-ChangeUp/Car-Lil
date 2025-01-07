require('dotenv').config({ path: '../../.env' });

const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];
const db = require('knex')(config);

const CARPORTS_TABLE = 'carports';
const SHARE_CARS_TABLE = 'share_cars';
const CARS_TABLE = 'cars';

let _resultRentalData = {
  carport_id: 1,
  carport_address: '愛知県名古屋市西区',
  share_car_id: 1,
  share_price: 330,
  car_id: 1,
  car_maker: 'トヨタ',
  car_name: 'クラウン',
  car_type: 'セダン',
  car_capacity: 5,
  car_image_url1: '../../src/assets/CarImages/Crown_Ext.png',
  car_image_url2: '../../src/assets/CarImages/Crown_Int.png',
  rental_date: '2024-12-19T00:00:00.000Z',
  owner_rental_time: {
    strTime: '07:00',
    endTime: '23:00'
  },
  booking_time: [
    {
      strTime: '08:00',
      endTime: '11:00'
    },
    {
      strTime: '15:00',
      endTime: '20:00'
    },
  ]
}

module.exports = {
  CARPORTS_TABLE, SHARE_CARS_TABLE, CARS_TABLE,
  async get(carPortId, shareCarId) {
    const _resultFindCarPortData = await db(CARPORTS_TABLE).where({ id: carPortId });
    _resultRentalData.carport_id = _resultFindCarPortData[0].id;
    _resultRentalData.carport_address = _resultFindCarPortData[0].address;
    
    const _resultFindShareCarData = await db(SHARE_CARS_TABLE).where({ id: shareCarId });
    _resultRentalData.share_car_id = _resultFindShareCarData[0].id;
    _resultRentalData.share_price = _resultFindShareCarData[0].share_prise;
    const carId = _resultFindShareCarData[0].car_id;
    
    const _resultFindCarData = await db(CARS_TABLE).where({ id: carId });
    _resultRentalData.car_id = _resultFindCarData[0].id;
    _resultRentalData.car_maker = _resultFindCarData[0].maker;
    _resultRentalData.car_name = _resultFindCarData[0].car_name;
    _resultRentalData.car_type = _resultFindCarData[0].car_type;
    _resultRentalData.car_capacity = _resultFindCarData[0].capacity;
    
    return _resultRentalData;
  }
};
