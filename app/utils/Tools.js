'use strict';
require('dotenv').config();
const {v4: uuid} = require('uuid');
const semver = require('semver');


let Tools = {
    uuid: () => {
        return uuid();
    },
    getRoomsForHouses: async (Rooms, houses) => {
        let housesList = [];

        if (houses.length > 1) {
            for (let house of houses) {
                let rooms = await Rooms.findAll({
                    where: {
                        houseId: house.id
                    }
                });
                housesList.push({house, rooms});
            }
        } else if (houses.length === 1) {
            let rooms = await Rooms.findAll({
                where: {
                    houseId: houses[0].id
                }
            });
            housesList.push({houses, rooms});
        } else {
            return housesList;
        }

        return housesList;
    },
    getEquipmentsForHouse: async (rooms, RoomEquipments, Equipments) => {

        let roomsArray = [];
        let equipmentArray = [];

        // Si on a une liste de plusieurs rooms
        if (rooms.length > 1) {

            for (let room of rooms) {
                // Pour chaque chambre on prend les lignes de la table RoomEquipments qui correspondent
                let equipments = await RoomEquipments.findAll({
                    where: {
                        roomId: room.id
                    }
                });
                for (let row of equipments) {
                    // Pour chaque ligne d'équipement on le push dans l'array en cherchant la correspondance du row.id dans le Equipments.id
                    equipmentArray.push(await Equipments.findByPk(row.equipmentId));
                }
                roomsArray.push({
                    room: {
                        id: room.id,
                        name: room.name,
                        equipments: equipmentArray
                    }
                });
                equipmentArray = [];
            }

        } else if (rooms.dataValues) {
            let equipments = await RoomEquipments.findAll({
                where: {
                    roomId: rooms.id
                }
            });
            for (let row of equipments) {
                equipmentArray.push(await Equipments.findByPk(row.equipmentId));
            }
            roomsArray.push({
                room: {
                    id: rooms.dataValues.id,
                    name: rooms.dataValues.name,
                    equipments: equipmentArray
                }
            });
            roomsArray.push(rooms[0], equipments);
        }
        return roomsArray;
    }

}
module.exports = Tools;