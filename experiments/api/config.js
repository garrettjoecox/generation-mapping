
require('colorslite');
const _ = require('lodash');

const config = {
  port: process.env.PORT || 9000,

  log: {
    prefix: 'GenMap'.blue,
    level: 'all',
  },

  mysql: {
    database: process.env.MYSQL_DB || 'noplaceleft',
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'Configure in Local',
    pass: process.env.MYSQL_PASS || 'Configure in Local',
    dialect: 'mysql',
    logging: false,
  },

  jwt: {
    secret: 'Configure in Local',
    config: { session: false },
  },

  salt: 'Configure in Local',

  masterToken: 'Configure in Local',
};

try {
  const local = require('./local');
  module.exports = app.config = _.merge({}, config, local);
} catch (e) {
  module.exports = app.config = config;
}
