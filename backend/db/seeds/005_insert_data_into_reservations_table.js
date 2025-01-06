/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reservations').del();
  await knex('reservations').insert([
    {
      user_id: 2,
      share_car_id: 3,
      carport_id: 3,
      share_state: '予約',
      reserved_at: '2024-12-18 09:00:00',
      rent_at: '2024-12-28 10:00:00',
      rented_at: null,
      return_at: '2024-12-28 15:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 2,
      carport_id: 2,
      share_state: '予約',
      reserved_at: '2024-12-24 21:00:00',
      rent_at: '2024-12-25 08:00:00',
      rented_at: null,
      return_at: '2024-12-25 08:30:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 2,
      carport_id: 2,
      share_state: '予約',
      reserved_at: '2024-12-24 21:05:00',
      rent_at: '2024-12-25 15:00:00',
      rented_at: null,
      return_at: '2024-12-25 15:30:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 4,
      share_car_id: 3,
      carport_id: 3,
      share_state: '予約',
      reserved_at: '2024-12-18 21:00:00',
      rent_at: '2024-12-29 08:00:00',
      rented_at: null,
      return_at: '2024-12-29 20:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 2,
      carport_id: 2,
      share_state: '予約',
      reserved_at: '2024-12-26 21:00:00',
      rent_at: '2024-12-27 08:00:00',
      rented_at: null,
      return_at: '2024-12-27 08:30:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 2,
      carport_id: 2,
      share_state: '予約',
      reserved_at: '2024-12-26 21:05:00',
      rent_at: '2024-12-27 15:00:00',
      rented_at: null,
      return_at: '2024-12-27 15:30:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 1,
      share_car_id: 1,
      carport_id: 1,
      share_state: '予約',
      reserved_at: '2024-12-28 10:00:00',
      rent_at: '2024-12-30 10:00:00',
      rented_at: null,
      return_at: '2024-12-30 15:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 2,
      carport_id: 2,
      share_state: '予約',
      reserved_at: '2024-12-29 09:00:00',
      rent_at: '2024-12-30 10:00:00',
      rented_at: null,
      return_at: '2024-12-30 16:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 1,
      carport_id: 1,
      share_state: '予約',
      reserved_at: '2024-12-29 09:10:00',
      rent_at: '2024-12-31 09:00:00',
      rented_at: null,
      return_at: '2024-12-31 12:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 3,
      carport_id: 3,
      share_state: '予約',
      reserved_at: '2024-12-29 09:15:00',
      rent_at: '2024-12-31 16:00:00',
      rented_at: null,
      return_at: '2024-12-31 22:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 1,
      share_car_id: 4,
      carport_id: 4,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 08:00:00',
      rented_at: null,
      return_at: '2024-12-31 09:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 5,
      carport_id: 5,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 08:00:00',
      rented_at: null,
      return_at: '2024-12-31 09:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 6,
      carport_id: 6,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 08:00:00',
      rented_at: null,
      return_at: '2024-12-31 09:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 1,
      share_car_id: 6,
      carport_id: 6,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 10:00:00',
      rented_at: null,
      return_at: '2024-12-31 11:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 7,
      carport_id: 7,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 10:00:00',
      rented_at: null,
      return_at: '2024-12-31 11:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 3,
      share_car_id: 8,
      carport_id: 8,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 10:00:00',
      rented_at: null,
      return_at: '2024-12-31 11:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
    {
      user_id: 2,
      share_car_id: 10,
      carport_id: 9,
      share_state: '予約',
      reserved_at: '2024-12-24 09:15:00',
      rent_at: '2024-12-31 12:00:00',
      rented_at: null,
      return_at: '2024-12-31 13:00:00',
      returned_at: null,
      evaluation: null,
      is_refueled: null,
      is_washed: null,
    },
  ]);
};
