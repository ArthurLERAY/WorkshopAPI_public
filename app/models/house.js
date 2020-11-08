'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class house extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            house.belongsTo(models.User);
            house.hasMany(models.room);
        }
    };
    house.init({
        name: DataTypes.STRING,
        userId: DataTypes.UUID
    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        sequelize,
        modelName: 'house',
    });
    return house;
};