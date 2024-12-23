const userModel = require('./users.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allUsers = await userModel.all(limit);
    res.status(200).send({ data: allUsers });
  },
  //ユーザIDからユーザデータを取得してレスポンスとして送る
  async view(req, res) {
    const userId = req.params.id;
    const user = await userModel.find(userId);
    res.status(200).send({ data: user });
  },
};
