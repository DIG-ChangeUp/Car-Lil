/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cars').del();
  await knex('cars').insert([
    {
      car_name: 'スペーシアカスタム',
      maker: 'スズキ',
      capacity: 5,
      car_type: '軽自動車',
      image1: 'spaciaCustom_Ext.png',
      image2: 'spaciaCustom_Int.png',
    },
    {
      car_name: 'ヴォクシー',
      maker: 'トヨタ',
      capacity: 7,
      car_type: 'ミニバン',
      image1: 'voxy_Ext.png',
      image2: 'voxy_Int.png',
    },
    {
      car_name: 'ルーミー',
      maker: 'トヨタ',
      capacity: 5,
      car_type: 'コンパクト',
      image1: 'roomy_Ext.png',
      image2: 'roomy_Int.png',
    },
    {
      car_name: 'ハイラックスサーフ',
      maker: 'トヨタ',
      capacity: 5,
      car_type: 'SUV',
      image1: 'surf_Ext.png',
      image2: 'surf_Int.png',
    },
    {
      car_name: 'セレナ',
      maker: '日産',
      capacity: 7,
      car_type: 'ミニバン',
      image1: 'selena_Ext.png',
      image2: 'selena_Int.png',
    },
    {
      car_name: 'ラウム',
      maker: 'トヨタ',
      capacity: 5,
      car_type: 'コンパクト',
      image1: 'raum_Ext.png',
      image2: 'raum_Int.png',
    },
    {
      car_name: 'CX-5',
      maker: 'マツダ',
      capacity: 5,
      car_type: 'SUV',
      image1: 'cx5_Ext.png',
      image2: 'cx5_Int.png',
    },
    {
      car_name: 'ライズ',
      maker: 'トヨタ',
      capacity: 5,
      car_type: 'コンパクト',
      image1: 'rise_Ext.png',
      image2: 'rise_Int.png',
    },
    {
      car_name: 'ノア',
      maker: 'トヨタ',
      capacity: 7,
      car_type: 'ミニバン',
      image1: 'noah_Ext.png',
      image2: 'noah_Int.png',
    },
    {
      car_name: 'アクア',
      maker: 'トヨタ',
      capacity: 5,
      car_type: 'コンパクト',
      image1: 'aqua_Ext.png',
      image2: 'aqua_Int.png',
    },
    {
      car_name: 'ノートオーラ',
      maker: '日産',
      capacity: 5,
      car_type: 'コンパクト',
      image1: 'noteAura_Ext.png',
      image2: 'noteAura_Int.png',
    },
  ]);
};
