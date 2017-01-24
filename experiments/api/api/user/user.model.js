
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  inviteToken: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4()
  },
}, {
  classMethods: {
    associate(models) {
      models.user.hasMany(models.user, { foreignKey: 'parentId' });
    },
  },
  hooks: {
    beforeCreate(instance, options, next) {
      if (instance.password) {
        bcrypt.hash(instance.password, app.config.salt, (err, hashed) => {
          if (!err) {
            instance.password = hashed;
            next();
          } else next(err);
        });
      } else next();
    },

    beforeUpdate(instance, options, next) {
      if (instance.password) {
        bcrypt.hash(instance.password, app.config.salt, (err, hashed) => {
          if (!err) {
            instance.password = hashed;
            next();
          } else next(err);
        });
      } else next();
    }
  }
});
