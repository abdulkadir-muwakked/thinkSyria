"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        as: "Category",
        foreignKey: "categoryId"
      });
      Product.hasMany(models.Cart, { as: "Cart" });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      image: DataTypes.STRING,
      rate: DataTypes.FLOAT,
      count: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product;
};
