const express = require('express');
require('dotenv').config({ path: './.env' });
const environment = process.env.NODE_ENV;
const cors = require('cors');
const { resolve } = require('node:path');

const usersController = require('./users/users.controller');
const calcDistance = require('./calcDistance');

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/', express.static(resolve(__dirname, '../dist')));

  app.get('/api', usersController.index);
  app.get('/distance', calcDistance.calcDistance);

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
