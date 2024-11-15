"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  users_tb.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users_tb",
      freezeTableName: true,
    }
  );
  return users_tb;
};
