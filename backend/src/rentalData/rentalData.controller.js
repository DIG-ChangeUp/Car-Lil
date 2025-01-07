const rentalDataModel = require('./rentalData.model');

module.exports = {
  async index(req, res) {
    const _carPortId = req.body.car_port_id;
    const _shareCarId = req.body.share_car_id;

    const _resultRentalData = await rentalDataModel.get(_carPortId, _shareCarId);
    res.status(200).send({ data: _resultRentalData });
  },

};
