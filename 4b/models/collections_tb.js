"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collections_tb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  collections_tb.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "collections_tb",
      freezeTableName: true,
    }
  );
  return collections_tb;
};
