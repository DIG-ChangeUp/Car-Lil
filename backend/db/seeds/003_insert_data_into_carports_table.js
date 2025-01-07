/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('carports').del();
  await knex('carports').insert([
    {
      user_id: 5,
      address: '愛知県名古屋市中村区名駅４丁目７−１',
      latitude: 35.170369507341,
      longitude: 136.88513096198,
    },
    {
      user_id: 6,
      address: '愛知県名古屋市中村区名駅３丁目９',
      latitude: 35.17440791380188,
      longitude: 136.8860467549867,
    },
    {
      user_id: 7,
      address: '愛知県名古屋市中村区名駅３丁目２４',
      latitude: 35.17241444966899,
      longitude: 136.8869789685884,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市西区那古野２丁目２２',
      latitude: 35.17487600360479,
      longitude: 136.8892664190563,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市西区那古野１丁目５',
      latitude: 35.176489104212564,
      longitude: 136.89238416776394,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中区栄２丁目１０−５',
      latitude: 35.166871773952145,
      longitude: 136.8986331364515,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中区大須３丁目３０−４０',
      latitude: 35.16047706867236,
      longitude: 136.90588116383915,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中村区大正町３丁目１１',
      latitude: 35.16329672244962,
      longitude: 136.8743990078603,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中村区',
      latitude: 35.15783467837729,
      longitude: 136.8539562808293,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中村区稲葉地町１丁目',
      latitude: 35.16807834671538,
      longitude: 136.8455877846741,
    },
    {
      user_id: 8,
      address: '愛知県名古屋市中村区稲葉地町２丁目',
      latitude: 36.16807834671538,
      longitude: 136.8455877846741,
    },
  ]);
};
