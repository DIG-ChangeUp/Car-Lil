/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('requests').del();
  await knex('requests').insert([
    {
      user_id: 1,
      latitude: 35.1650369507341,
      longitude: 136.85513096198,
      message: '自宅から近い方にお借りできるとありがたいです。',
      created_at: '2024-11-01 05:30:00',
    },
    {
      user_id: 2,
      latitude: 35.087228979265475,
      longitude: 137.1560924185806,
      message: '豊田市駅前にないかな',
      created_at: '2024-12-18 09:30:00',
    },
    {
      user_id: 3,
      latitude: 35.15239455611869,
      longitude: 136.88916816280468,
      message: '広めの空き地があります。',
      created_at: '2024-12-18 10:30:00',
    },
    {
      user_id: 4,
      latitude: 35.164735453026296,
      longitude: 136.91049763669653,
      message: '引っ越してきました。たまにカーシェア借りたいです。',
      created_at: '2024-11-01 05:30:00',
    },
    {
      user_id: 1,
      latitude: 35.06182414113726,
      longitude: 136.98256342838215,
      message: '自宅から近い方にお借りできるとありがたいです。',
      created_at: '2024-11-01 05:30:00',
    },
    {
      user_id: 2,
      latitude: 35.175562925830754,
      longitude: 136.88427428020148,
      message: 'たまに出張の際に使いたいです。',
      created_at: '2024-12-18 11:30:00',
    },
    {
      user_id: 3,
      latitude: 35.11786966786297,
      longitude: 137.04880720713197,
      message: '広めの空き地があります。',
      created_at: '2024-11-01 05:30:00',
    },
    {
      user_id: 4,
      latitude: 35.144097396447435,
      longitude: 136.90238917333815,
      message: 'ここで借りたい。',
      created_at: '2024-11-30 09:30:00',
    },
    {
      user_id: 1,
      latitude: 35.009025087364186,
      longitude: 136.9630019116961,
      message: '実家に行くために、ここでお借りしたいです。',
      created_at: '2024-11-01 05:30:00',
    },
    {
      user_id: 2,
      latitude: 35.115512339839235,
      longitude: 136.93651260895334,
      message: '車を買わずにここでカーシェア借りたいです。',
      created_at: '2024-11-01 05:30:00',
    },
  ]);
};
