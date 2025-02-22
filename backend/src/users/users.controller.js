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
    try {
      const [user] = await userModel.findByEmail(email);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(400).send('response error');
      }
    } catch (error) {
      res.status(400).send('response error');
    }
  },
  //ユーザメールアドレスからユーザ（オーナーorテナント）データを取得してレスポンスとして送る
  //!!!paramsではなくPOSTされたメールアドレスから取得
  async viewOfOwnerByEmail(req, res) {
    const email = req.body.email;
    try {
      const user = await userModel.findOwnerByEmail(email);
      if (user.length >= 1) {
        res.status(200).send({ data: user });
      } else {
        res.status(400).send('response error');
      }
    } catch (error) {
      res.status(400).send('response error');
    }
  },
  async viewOfTenantByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.findTenantByEmail(email);
    res.status(200).send({ data: user });
  },

  async addUser(req, res) {
    const addUserData = {
      user_name: 'user',
      email: req.body.email,
      user_type: req.body.user_type,
    };
    try {
      const user = await userModel.save(addUserData);
      //返り値は現状使っていない
      res.status(200).send({ data: user });
    } catch (error) {
      res.status(400).send('response error');
    }
  },

  async editUserType(req, res) {
    const editUserData = {
      email: req.body.email,
      user_type: req.body.user_type,
    };
    const user = await userModel.edit(editUserData);
    res.status(200).send({ data: user });
  },
};
