const express = require('express');
require('dotenv').config({ path: './.env' });
const environment = process.env.NODE_ENV;
const cors = require('cors');
const { resolve } = require('node:path');

const usersController = require('./users/users.controller');
const calcDistance = require('./calcDistance');
const carportsController = require('./carports/carports.controller');

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));

  app.get('/api/users', usersController.index);
  app.get('/api/carports', carportsController.index);
  app.post('/api/distance', carportsController.getDistance);
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
