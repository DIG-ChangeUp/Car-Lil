const userModel = require('./users.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allUsers = await userModel.all(limit);
    res.status(200).send({ data: allUsers });
  },
  //ユーザIDからユーザデータを取得してレスポンスとして送る
  //!!!ユーザーの存在確認用
  async confirmationByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.findByEmail(email);
    res.status(200).send(user.length === 1);
  },
  //ユーザメールアドレスからユーザ（オーナーorテナント）データを取得してレスポンスとして送る
  //!!!paramsではなくPOSTされたメールアドレスから取得
  async viewOfOwnerByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.findOwnerByEmail(email);
    res.status(200).send({ data: user });
  },
  async viewOfTenantByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.findTenantByEmail(email);
    res.status(200).send({ data: user });
  },
};
