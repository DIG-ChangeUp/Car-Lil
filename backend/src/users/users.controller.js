const userModel = require('./users.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allUsers = await userModel.all(limit);
    res.status(200).send({ data: allUsers });
  },
  //ユーザ名からユーザデータを取得してレスポンスとして送る
  async view(req, res) {
    const userName = req.params.user_name;
    const user = await userModel.find(userName);
    res.status(200).send({ data: user });
  },
  // //初回ユーザ登録（サインアップ）
  // async signUp(req, res) {
  //   const userData = req.body;
  //   console.log('userData: ', userData);
  //   if (userData.user_name && userData.password) {
  //     const foundUser = await userModel.find(userData.user_name);
  //     if (!foundUser.id) {
  //       await userModel.save(userData);
  //       res.status(200).json({
  //         message: `${foundUser.user_name}さんのユーザ登録が完了しました。`,
  //       });
  //     } else {
  //       res.status(400).json({
  //         message: `入力されたユーザ名 ${foundUser.user_name} はすでに存在します。別のユーザ名で登録してください。`,
  //       });
  //     }
  //   } else {
  //     res.status(400).json({
  //       message:
  //         'ユーザ登録にはユーザ名とパスワードが必要です。再度入力をお願いします。',
  //     });
  //   }
  // },
  // //初回登録以降のログイン認証
  // async logIn(req, res) {
  //   const userData = req.body;
  //   // const user = userModel.find(userData.user_name)
  //   const isCheckOK = await userModel.check(
  //     userData.userName,
  //     userData.password
  //   );
  //   if (isCheckOK) {
  //     res.status(200).json({
  //       message: `${userData.userName}さん こんにちは！ログイン完了しました。`,
  //     });
  //   } else {
  //     res.status(401).json({
  //       //ステータスコード401はアクセス権が無い、または認証失敗
  //       message: 'ログイン出来ませんでした。再度入力をお願いします。',
  //     });
  //   }
  // },
};
