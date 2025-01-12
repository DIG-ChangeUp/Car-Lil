const carportsModel = require('./carports.model');
// Google Route APIへのリクエスト数を
const GOOGLE_ROUTE_API_MAX_REQUEST = 10;

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
    try {
      const distanceData = await carportsModel.calcDistance(currentPosition);
      res.status(200).send({ data: distanceData });
    } catch (error) {
      res.status(400).send('response error');
    }
  },

  async getDistance(req, res) {
    const currentPosition = req.body.currentPosition;
    try {
      let distanceData = await carportsModel.calcDistance(currentPosition);
      // Google Route APIへのリクエスト数を制御する
      // 開発時はstrict modeによって、２回実行されるのでリクエスト数が増えることに注意
      distanceData = distanceData.filter(
        (data, i) => i < GOOGLE_ROUTE_API_MAX_REQUEST
      );

      // 出発地点の文字列作成 "lat,lng | lat,lng ... "
      const currLocations = Array.from(
        { length: distanceData.length },
        () => `${currentPosition.lat},${currentPosition.lng}`
      );
      const _origin = currLocations.join('|');

      // carportの緯度経度文字列作成 "lat1,lng1 | lat2,lng2 ..."
      const latLongs = distanceData.map(
        (distance) => `${distance.latitude},${distance.longitude}`
      );
      const _destination = latLongs.join('|');

      //GoogleAPIへのデータ送信
      async function getRootDistance() {
        let API_URL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${_origin}&destinations=${_destination}&mode=walking&language=ja`;
        //import.meta.envはESモジュールで利用できないためprocess.envを使う
        API_URL += '&key=' + process.env.GOOGLE_API_KEY;

        const _resultRootDistance = await fetch(API_URL);
        return await _resultRootDistance.json();
      }

      const apiResponseData = await getRootDistance();
      distanceData.forEach(
        (distance, i) => (apiResponseData.rows[i].carData = distance)
      );

      const filteredApiResponseData = apiResponseData.rows.map((data, i) => {
        return {
          carData: data.carData,
          distance: data.elements[i].distance,
          duration: data.elements[i].duration,
        };
      });

      const sortData = filteredApiResponseData.sort(
        (a, b) => a.distance.value - b.distance.value
      );

      res.status(200).send({ data: sortData });
    } catch (error) {
      res.status(400).send('response error:');
    }
  },
};
