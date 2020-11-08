'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class equipmentSuggest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  equipmentSuggest.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    watts: DataTypes.DOUBLE,
    ref: DataTypes.STRING,
    img: DataTypes.TEXT,
    link: DataTypes.TEXT,
    typeId: DataTypes.UUID
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    modelName: 'equipmentSuggest',
  });
  return equipmentSuggest;
};