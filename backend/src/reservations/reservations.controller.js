const reservationsModel = require('./reservations.model');

module.exports = {
  async findReservation(req, res) {
    const user_id = req.params.user_id;
    const result = await reservationsModel.find(user_id);
    console.log('🚀🚀🚀🚀 --->> result: ', result);
    res.status(200).send({ data: result });
  },
};
