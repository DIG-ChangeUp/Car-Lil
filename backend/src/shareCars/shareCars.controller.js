const shareCarsModel = require('./shareCars.model');

module.exports = {
  //全シェアカーデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allShareCars = await shareCarsModel.all(limit);
    res.status(200).send({ data: allShareCars });
  },
  //ユーザーIDからシェアカーデータを取得してレスポンスとして送る
  async view(req, res) {
    const userId = req.body.userId;
    const shareCars = await shareCarsModel.find(userId);
    res.status(200).send({ data: shareCars });
  },
};
