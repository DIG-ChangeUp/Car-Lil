/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('carports').del();
  await knex('carports').insert([
    {
      user_id: 4,
      address: '愛知県豊田市前山町２丁目',
      latitude: 35.048598799088346,
      longitude: 137.1644684743606,
    },
    {
      user_id: 5,
      address: '愛知県豊田市トヨタ町３−１',
      latitude: 35.059292452491164,
      longitude: 137.15968404362522,
    },
    {
      user_id: 6,
      address: '愛知県豊田市前田町７丁目',
      latitude: 35.05948539181806,
      longitude: 137.16264517936924,
    },
    {
      user_id: 7,
      address: '愛知県豊田市秋葉町３丁目',
      latitude: 35.059361178781955,
      longitude: 137.1662248682886,
    },
    {
      user_id: 8,
      address: '愛知県豊田市トヨタ町１０−５',
      latitude: 35.055611291188306,
      longitude: 137.16995970606754,
    },
    {
      user_id: 9,
      address: '愛知県豊田市トヨタ町１２',
      latitude: 35.05180261452872,
      longitude: 137.1703190409055,
    },
    {
      user_id: 10,
      address: '愛知県豊田市トヨタ町',
      latitude: 35.05244354872001,
      longitude: 137.16315030699525,
    },
    {
      user_id: 11,
      address: '愛知県豊田市明和町２丁目３０−５',
      latitude: 35.05144410671101,
      longitude: 137.16128572074598,
    },
    {
      user_id: 12,
      address: '愛知県豊田市トヨタ町',
      latitude: 35.05183130175474,
      longitude: 137.15888518401425,
    },
    {
      user_id: 13,
      address: '愛知県豊田市豊栄町１丁目',
      latitude: 35.05225505607959,
      longitude: 137.15611940502293,
    },
    {
      user_id: 14,
      address: '愛知県豊田市丸山町１０丁目',
      latitude: 35.05963947199984,
      longitude: 137.1507947596929,
    },
  ]);
};
