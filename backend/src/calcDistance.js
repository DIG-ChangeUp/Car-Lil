// 緯度、経度での計算テスト始まり------------

const samplePlace = { latitude: 35, longitude: 136 };
const sampleData = [
  {
    id: 1,
    user_id: 5,
    address: '愛知県名古屋市中村区名駅４丁目７−１',
    latitude: 35.170369507341,
    longitude: 136.88513096198,
  },
  {
    id: 2,
    user_id: 6,
    address: '愛知県名古屋市中村区名駅３丁目９',
    latitude: 35.17440791380188,
    longitude: 136.8860467549867,
  },
  {
    id: 3,
    user_id: 7,
    address: '愛知県名古屋市中村区名駅３丁目２４',
    latitude: 35.17241444966899,
    longitude: 136.8869789685884,
  },
  {
    id: 4,
    user_id: 8,
    address: '愛知県名古屋市西区那古野２丁目２２',
    latitude: 35.17487600360479,
    longitude: 136.8892664190563,
  },
  {
    id: 5,
    user_id: 8,
    address: '愛知県名古屋市西区那古野１丁目５',
    latitude: 35.176489104212564,
    longitude: 136.89238416776394,
  },
  {
    id: 6,
    user_id: 8,
    address: '愛知県名古屋市中区栄２丁目１０−５',
    latitude: 35.166871773952145,
    longitude: 136.8986331364515,
  },
  {
    id: 7,
    user_id: 8,
    address: '愛知県名古屋市中区大須３丁目３０−４０',
    latitude: 35.16047706867236,
    longitude: 136.90588116383915,
  },
  {
    id: 8,
    user_id: 8,
    address: '愛知県名古屋市中村区大正町３丁目１１',
    latitude: 35.16329672244962,
    longitude: 136.8743990078603,
  },
  {
    id: 9,
    user_id: 8,
    address: '愛知県名古屋市中村区',
    latitude: 35.15783467837729,
    longitude: 136.8539562808293,
  },
  {
    id: 10,
    user_id: 8,
    address: '愛知県名古屋市中村区稲葉地町１丁目',
    latitude: 35.16807834671538,
    longitude: 136.8455877846741,
  },
];

const R = Math.PI / 180;
//２地点間の距離を計算
function distance(lat1, lng1, lat2, lng2) {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return (
    6371 *
    Math.acos(
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
        Math.sin(lat1) * Math.sin(lat2)
    )
  );
}
function calcDistance(myPlace, placeData) {
  const copyData = [...placeData];
  copyData.map((data) => {
    data.distance = distance(
      myPlace.latitude,
      myPlace.longitude,
      data.latitude,
      data.longitude
    );
  });
  copyData.sort((a, b) => a.distance - b.distance);
  return copyData;
}
// console.log('data-------', calcDistance(samplePlace, sampleData));
// 緯度、経度での計算テスト終わり------------

module.exports = {
  async calcDistance(req, res) {
    // 本番は下の記述でcarportsテーブルからデータを取得
    // const allCarports = await carportModel.all(limit);
    const myPlace = samplePlace;
    const allCarports = sampleData;
    const distanceData = calcDistance(myPlace, allCarports);
    res.status(200).send({ data: distanceData });
  },
};
