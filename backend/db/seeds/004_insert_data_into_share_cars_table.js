/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('share_cars').del();
  await knex('share_cars').insert([
    {
      user_id: 5,
      car_id: 1,
      carport_id: 1,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 6,
      car_id: 2,
      carport_id: 2,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 7,
      car_id: 3,
      carport_id: 3,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 4,
      carport_id: 4,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 5,
      carport_id: 5,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 6,
      carport_id: 6,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 7,
      carport_id: 7,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 8,
      carport_id: 8,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 9,
      carport_id: 9,
      share_prise: 330,
      share_state: '待機',
    },
    {
      user_id: 8,
      car_id: 10,
      carport_id: 10,
      share_prise: 330,
      share_state: '待機',
    },
  ]);
};
