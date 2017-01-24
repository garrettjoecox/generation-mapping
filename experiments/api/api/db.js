
const path = require('path').join;
const Sequelize = require('sequelize');

const models = ['user', 'church'];

app.db = { connection: new Sequelize(app.config.mysql.database, app.config.mysql.user, app.config.mysql.pass, app.config.mysql) };

models
  .map((name) => {
    const model = app.db.connection.import(path(__dirname, `${name}/${name}.model.js`));
    app.db[model.name] = model;
    return model;
  })
  .forEach((model) => {
    if ('associate' in model) model.associate(app.db);
  });
