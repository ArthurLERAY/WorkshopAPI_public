'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      room.belongsTo(models.house);
      // room.hasMany(models.equipment);
    }
  };
  room.init({
    name: DataTypes.STRING,
    houseId: DataTypes.UUID
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    modelName: 'room',
  });
  return room;
};