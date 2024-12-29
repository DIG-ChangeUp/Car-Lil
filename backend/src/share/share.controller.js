const shareModel = require('./share.model');

module.exports = {
  //オーナーの貸出設定を新規登録
  async addNewShareData(req, res) {
    const newShareData = {
      user_id: req.body.user_id,
      carport_id: req.body.carport_id,
      share_car_id: req.body.share_car_id,
      start_at: req.body.start_at,
      end_at: req.body.end_at,
    };
    console.log('newShareData------', newShareData);
    const addedData = await shareModel.save(newShareData);
    res.status(200).send({ data: addedData });
  },
};
