const carsModel = require('./cars.model');

module.exports = {
  //全車種データを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allCars = await carsModel.all(limit);
    res.status(200).send({ data: allCars });
  },
  //車種IDから車種データを取得してレスポンスとして送る
  async view(req, res) {
    const userId = req.params.id;
    const car = await carsModel.find(userId);
    res.status(200).send({ data: car });
  },
};
