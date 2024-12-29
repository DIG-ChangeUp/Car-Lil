const shareModel = require('./share.model');

module.exports = {
  async findShareByShareCarId(req, res) {
    const share_car_id = Number(req.params.share_car_id);
    const result = await shareModel.findByShareCarId(share_car_id);
    res.status(200).send({ data: result });
  },
};
