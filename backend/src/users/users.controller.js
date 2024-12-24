const userModel = require('./users.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allUsers = await userModel.all(limit);
    res.status(200).send({ data: allUsers });
  },
  //ユーザIDからユーザデータを取得してレスポンスとして送る
  //!!!paramsではなくPOSTされたIDから取得
  async viewById(req, res) {
    const userId = req.body.id;
    const user = await userModel.find(userId);
    res.status(200).send({ data: user });
  },
  //ユーザメールアドレスからユーザデータを取得してレスポンスとして送る
  //!!!paramsではなくPOSTされたメールアドレスから取得
  async viewByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.find(email);
    res.status(200).send({ data: user });
  },
};
