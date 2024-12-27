const express = require('express');
require('dotenv').config({ path: './.env' });
const environment = process.env.NODE_ENV;
const cors = require('cors');
const { resolve } = require('node:path');

const usersController = require('./users/users.controller');
const carsController = require('./cars/cars.controller');
const carportsController = require('./carports/carports.controller');
const shareCarsController = require('./shareCars/shareCars.controller');
//テスト用
const calcDistance = require('./calcDistance');

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));

  app.get('/api/users', usersController.index); //全ユーザー取得
  app.post('/api/addUser', usersController.addUser); //新規ユーザー登録
  app.post('/api/editUserType', usersController.editUserType); //ユーザータイプ編集 ユーザーからオーナーへ
  app.post('/api/users/email', usersController.confirmationByEmail); //メールアドレスからユーザーの存在を確認
  app.post('/api/users/owner/email/', usersController.viewOfOwnerByEmail); //emailからオーナー全情報取得
  app.post('/api/users/tenant/email/', usersController.viewOfTenantByEmail); //emailからテナント全情報取得
  app.get('/api/cars', carsController.index); //全車種取得
  app.get('/api/carports', carportsController.index); //全駐車場取得
  app.post('/api/allCarports', carportsController.getAllCarPorte); //map pin用駐車場取得
  app.get('/api/shareCars', shareCarsController.index); //全シェアカー取得
  app.post('/api/shareCars/userId', shareCarsController.view); //ユーザーIDから全シェアカー取得
  app.post('/api/distance', carportsController.getDistance); //DB、GoogleAPI双方で一番近い駐車場への実移動距離を取得
  //テスト用
  app.get('/distance', calcDistance.calcDistance); //テスト用

  return app;
}

module.exports = {
  setupServer,
};

const app = setupServer();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  if (environment === 'development') {
    console.log(`Local server is running on: http://localhost:${PORT}/`);
  } else {
    console.log(`Web server is running  PORT:${PORT}/`);
  }
});
