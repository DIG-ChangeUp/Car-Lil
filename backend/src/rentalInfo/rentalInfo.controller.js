const rentalInfoModel = require('./rentalInfo.model');

module.exports = {
  async index(req, res) {
    const _resultRentalInfo = await rentalInfoModel.get();
    res.status(200).send({ data: _resultRentalInfo });
  },

};
