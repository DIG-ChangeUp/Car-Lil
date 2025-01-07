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

  //google mapへのPin表示用のデータ取得 / google routes apiで距離計算しない
  async getAllCarPorte(req, res) {
    const currentPosition = req.body.currentPosition;
    const distanceData = await carportsModel.calcDistance(currentPosition);
    res.status(200).send({ data: distanceData });
  },

  async getDistance(req, res) {
    const currentPosition = req.body.currentPosition;
    const distanceData = await carportsModel.calcDistance(currentPosition); //本番用

    // console.log('distanceData ---->', distanceData);

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
      API_URL += '&language=ja'; // 帰値の住所を日本語表示にする
      //import.meta.envはESモジュールで利用できないためprocess.envを使う
      API_URL += '&key=' + process.env.GOOGLE_API_KEY;

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
        apiResponseData.carData = data;
        dataToSend.push(apiResponseData);
      })
    );

    function ascDistanceSort(a, b) {
      return a > b ? 1 : -1;
    }
    dataToSend.sort((a, b) =>
      ascDistanceSort(
        a.routes[0].legs[0].distance.value,
        b.routes[0].legs[0].distance.value
      )
    );
    res.status(200).send({ data: dataToSend });
  },
};
