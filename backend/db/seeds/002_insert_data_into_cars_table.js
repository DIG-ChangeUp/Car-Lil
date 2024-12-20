/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cars').del();
  await knex('cars').insert([
    {
      car_name: 'スイフト',
      maker: 'suzuki',
      capacity: 5,
      car_type: 'コンパクト',
      photo_url: './images/image001',
    },
    {
      car_name: 'ノア',
      maker: 'toyota',
      capacity: 7,
      car_type: 'ミニバン',
      photo_url: './images/image002',
    },
    {
      car_name: 'フリード',
      maker: 'honda',
      capacity: 6,
      car_type: 'ミニバン',
      photo_url: './images/image003',
    },
    {
      car_name: 'クラウン',
      maker: 'toyota',
      capacity: 5,
      car_type: 'セダン',
      photo_url: './images/image004',
    },
    {
      car_name: 'ノート',
      maker: '日産',
      capacity: 5,
      car_type: 'コンパクト',
      photo_url: './images/image005',
    },
    {
      car_name: 'プリウス',
      maker: 'toyota',
      capacity: 5,
      car_type: 'セダン',
      photo_url: './images/image006',
    },
    {
      car_name: 'CX-5',
      maker: 'mazda',
      capacity: 5,
      car_type: 'SUV',
      photo_url: './images/image007',
    },
    {
      car_name: 'セレナ',
      maker: '日産',
      capacity: 7,
      car_type: 'ミニバン',
      photo_url: './images/image008',
    },
    {
      car_name: 'アルファード',
      maker: 'toyota',
      capacity: 8,
      car_type: 'ミニバン',
      photo_url: './images/image009',
    },
    {
      car_name: 'N-BOX',
      maker: 'honda',
      capacity: 4,
      car_type: 'コンパクト',
      photo_url: './images/image010',
    },
  ]);
};
