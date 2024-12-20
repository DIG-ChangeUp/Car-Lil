/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('share').del();
  await knex('share').insert([
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-24 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-25 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-26 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-27 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-28 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-29 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-30 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 5,
      carport_id: 1,
      share_car_id: 1,
      start_at: '2024-12-31 09:00:00',
      end_at: '2024-12-24 15:00:00',
    },
    {
      user_id: 6,
      carport_id: 2,
      share_car_id: 2,
      start_at: '2024-12-24 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 6,
      carport_id: 2,
      share_car_id: 2,
      start_at: '2024-12-25 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 6,
      carport_id: 2,
      share_car_id: 2,
      start_at: '2024-12-26 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 6,
      carport_id: 2,
      share_car_id: 2,
      start_at: '2024-12-27 08:00:00',
      end_at: '2024-12-24 17:00:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-24 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-25 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-26 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-27 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-28 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-29 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-30 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
    {
      user_id: 7,
      carport_id: 3,
      share_car_id: 3,
      start_at: '2024-12-31 00:00:00',
      end_at: '2024-12-24 23:59:00',
    },
  ]);
};
