const rentalDataModel = require('./rentalData.model');

module.exports = {
  async index(req, res) {
    const _resultRentalData = await rentalDataModel.get();
    res.status(200).send({ data: _resultRentalData });
  },

};
