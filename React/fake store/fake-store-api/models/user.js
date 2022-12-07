"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.UserType, { as: "Type", foreignKey: "userTypeId" });
      User.hasMany(models.Cart, { as: "Cart" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      userTypeId: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "User"
    }
  );
  return User;
};
