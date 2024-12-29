const reservationsModel = require('./reservations.model');

module.exports = {
  async findReservationByUserId(req, res) {
    const user_id = req.params.user_id;
    const result = await reservationsModel.findByUserId(user_id);
    res.status(200).send({ data: result });
  },

  async findReservationByShareCarId(req, res) {
    const share_car_id = Number(req.params.share_car_id);
    const result = await reservationsModel.findByShareCarId(share_car_id);
    res.status(200).send({ data: result });
  },
};
