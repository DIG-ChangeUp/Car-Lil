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
    try {
      const addedData = await shareModel.save(newShareData);
      res.status(200).send({ data: addedData });
    } catch (error) {
      res.status(400).send('response error');
    }
  },

  async findShareByShareCarId(req, res) {
    const share_car_id = Number(req.params.share_car_id);
    console.log('🚀🚀🚀🚀 share_car_id--->> ', share_car_id);
    try {
      const result = await shareModel.findByShareCarId(share_car_id);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(400).send('response error');
    }
  },
};
