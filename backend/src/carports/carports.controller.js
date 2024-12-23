const carportsModel = require('./carports.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allCarports = await carportsModel.all(limit);
    res.status(200).send({ data: allCarports });
  },
  //ユーザ名からユーザデータを取得してレスポンスとして送る
  async view(req, res) {
    const carportId = req.params.id;
    const carport = await carportsModel.find(carportId);
    res.status(200).send({ data: carport });
  },
  async getDistance(req, res) {
    console.log('reqbody-----', req.body);
    // const testPosition = { latitude: 35, longitude: 136 };//テスト用
    const currentPosition = req.body.currentPosition;
    // const distanceData = await carportsModel.calcDistance(testPosition);//テスト用
    const distanceData = await carportsModel.calcDistance(currentPosition); //本番用
    res.status(200).send({ data: distanceData });
    console.log('distanceData:', distanceData);
  },
};
