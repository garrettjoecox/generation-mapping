
const express = require('express');
const app = global.app = express();

require('./config');
require('./services');
require('./middleware');
require('./api');

app.db.connection.sync()
  .then(() => log.info('Database Connected'))
  .then(() => new Promise(resolve => app.listen(app.config.port, () => resolve())))
  .then(() => log.info(`Listening on ${app.config.port}...`))
  .catch(e => log.error(e));