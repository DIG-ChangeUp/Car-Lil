const carportsModel = require('./carports.model');

module.exports = {
  //全ユーザデータを取得してレスポンスとして送る
  async index(req, res) {
    const limit = req.query.limit;
    const allCarports = await carportsModel.all(limit);
    res.status(200).send({ data: allCarports });
  },
  //ユーザ名からユーザデータを取得してレスポンスとして送る
  async view(req, res) {
    const carportId = req.params.id;
    const carport = await carportsModel.find(carportId);
    res.status(200).send({ data: carport });
  },
  async getDistance(req, res) {
    const currentPosition = req.body.currentPosition;
    const distanceData = await carportsModel.calcDistance(currentPosition); //本番用
    //GoogleAPIへのデータ送信
    async function getRootDistance(calculatedData) {
      const _destLat = calculatedData.latitude;
      const _destLng = calculatedData.longitude;
      const _originLat = currentPosition.latitude;
      const _originLng = currentPosition.longitude;

      let API_URL =
        'https://maps.googleapis.com/maps/api/directions/json?avoid=highways';
      API_URL += '&destination=' + _destLat + ',' + _destLng;
      API_URL += '&mode=walking';
      API_URL += '&origin=' + _originLat + ',' + _originLng;
      //import.meta.envはESモジュールで利用できないためprocess.envを使う
      API_URL += '&key=' + process.env.VITE_GOOGLE_API_KEY;

      const _resultRootDistance = await fetch(API_URL);
      const _aryRootDistance = await _resultRootDistance.json();
      // console.log('_aryRootDistance-----', _aryRootDistance);
      return _aryRootDistance;
    }
    // GoogleAPIからのレスポンスをクライアントにsendする
    const dataToSend = [];
    //
    await Promise.all(
      distanceData.map(async (data, _) => {
        const apiResponseData = await getRootDistance(data);
        dataToSend.push(apiResponseData);
      })
    );
    console.log('dataToSend----------', dataToSend);
    res.status(200).send({ data: dataToSend });
  },
};
