
module.exports = (sequelize, DataTypes) => sequelize.define('church', {
  displayname: DataTypes.STRING,
  // Admins
}, {
  classMethods: {
    associate(models) {
      models.church.hasMany(models.user);
    },
  },
});
