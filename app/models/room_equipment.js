'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // room_equipment.hasMany(models.room);
      // room_equipment.hasMany(models.equipment);
    }
  };
  room_equipment.init({
    roomId: DataTypes.UUID,
    equipmentId: DataTypes.UUID,
    quantity: DataTypes.INTEGER
  }, {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    sequelize,
    modelName: 'room_equipment',
  });
  return room_equipment;
};