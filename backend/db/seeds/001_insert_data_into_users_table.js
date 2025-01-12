/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      email: 'takashiyamada@mail.com',
      user_name: 'yamadatakashi',
      user_type: 'ユーザー',
    },
    {
      email: 'jirousaitou@mail.com',
      user_name: 'saitoujirou',
      user_type: 'ユーザー',
    },
    {
      email: 'mikisatou@mail.com',
      user_name: 'satoumiki',
      user_type: 'ユーザー',
    },
    {
      email: 'taroutanaka@mail.com',
      user_name: 'tanakatarou',
      user_type: 'オーナー',
    },
    {
      email: 'saburosuzuki@mail.com',
      user_name: 'suzukisaburo',
      user_type: 'オーナー',
    },
    {
      email: 'shirotoyota@mail.com',
      user_name: 'toyotashiro',
      user_type: 'オーナー',
    },
    {
      email: 'gorohonda@mail.com',
      user_name: 'hondagoro',
      user_type: 'オーナー',
    },
    {
      email: 'mochiokaneda@mail.com',
      user_name: 'kanedamochio',
      user_type: 'オーナー',
    },
    {
      email: 'rokuromitsubishi@mail.com',
      user_name: 'mitsubishirokuro',
      user_type: 'オーナー',
    },
    {
      email: 'shichironissan@mail.com',
      user_name: 'nissanshichiro',
      user_type: 'オーナー',
    },
    {
      email: 'hachirotoyohashi@mail.com',
      user_name: 'toyohashihachiro',
      user_type: 'オーナー',
    },
    {
      email: 'kurochiryu@mail.com',
      user_name: 'chiryukuro',
      user_type: 'オーナー',
    },
    {
      email: 'jurookazaki@mail.com',
      user_name: 'okazakijuro',
      user_type: 'オーナー',
    },
    {
      email: 'juichirokariya@mail.com',
      user_name: 'kariyajuichiro',
      user_type: 'オーナー',
    },
  ]);
};
