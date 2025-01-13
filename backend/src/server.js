const express = require('express');
require('dotenv').config({ path: './.env' });
const environment = process.env.NODE_ENV;
const cors = require('cors');
const { resolve } = require('node:path');

const usersController = require('./users/users.controller');
const carsController = require('./cars/cars.controller');
const carportsController = require('./carports/carports.controller');
const shareCarsController = require('./shareCars/shareCars.controller');
const reservationsController = require('./reservations/reservations.controller');
const shareController = require('./share/share.controller');
const rentalData = require('./rentalData/rentalData.controller');

function setupServer() {
  const app = express();
  const ORIGIN_URL = process.env.VITE_ORIGIN_API_URL;
  app.use(
    cors({
      origin: ORIGIN_URL || '*', // ORIGIN_URL が設定されていなければすべてのオリジンを許可
    })
  );
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));

  // GET =========================
  app.get(
    '/api/reservations/tenant/:user_id',
    reservationsController.findReservationByUserId
  ); //🎉使用 テナントの予約一覧取得
  app.get('/api/share/:share_car_id', shareController.findShareByShareCarId); //🎉使用 オーナーの貸出一覧取得

  // GET 未使用 ******************************
  app.get('/api/users', usersController.index); //🚨未使用 全ユーザー取得
  app.get('/api/cars', carsController.index); //🚨未使用 全車種取得
  app.get('/api/carports', carportsController.index); //🚨未使用 全駐車場取得
  app.get('/api/shareCars', shareCarsController.index); //🚨未使用 全シェアカー取得

  // POST ========================
  app.post('/api/addUser', usersController.addUser); //🎉使用 新規ユーザー登録
  app.post('/api/users/email', usersController.confirmationByEmail); //🎉使用 メールアドレスからユーザーの存在を確認
  app.post('/api/users/owner/email', usersController.viewOfOwnerByEmail); //🎉使用 emailからオーナー全情報取得
  app.post('/api/allCarports', carportsController.getAllCarPorte); //🎉使用 map pin用駐車場取得
  app.post('/api/distance', carportsController.getDistance); //🎉使用 DB、GoogleAPI双方で一番近い駐車場への実移動距離を取得
  app.post('/api/addNewShareData', shareController.addNewShareData); //🎉使用 オーナーの貸出設定を登録
  app.post('/api/addNewReservation', reservationsController.addNewReservation); //🎉使用 テナントの予約を登録し、対象車両のshare_stateも'予約'状態に変更
  app.post('/api/rentalData', rentalData.index); //🎉使用 レンタル情報

  // POST 未使用 ******************************
  app.post('/api/editUserType', usersController.editUserType); //🚨未使用 ユーザータイプ編集 ユーザーからオーナーへ
  app.post('/api/users/tenant/email', usersController.viewOfTenantByEmail); //🚨未使用 emailからテナント全情報取得
  app.post('/api/shareCars/userId', shareCarsController.view); //🚨未使用 ユーザーIDから全シェアカー取得

  return app;
}

const app = setupServer();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  if (environment === 'development') {
    console.log(`Local server is running on: http://localhost:${PORT}/`);
  } else {
    console.log(`Web server is running  PORT:${PORT}/`);
  }
});
