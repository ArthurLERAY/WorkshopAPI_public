'use strict';
module.exports = (db) => {
    const Rooms = db.room;
    const RoomEquipments = db.room_equipment;
    const Equipments = db.equipment;
    const Tools = require('../utils/Tools');
    return {
        getRoomById: async (req, res) => {
            try {
                let room = await Rooms.findOne({
                    where: {
                        id: req.params.id
                    }
                });
                return res.send(await Tools.getEquipmentsForHouse(room, RoomEquipments, Equipments));
            } catch (error) {
                return res.sendStatus(500).json(error.message);
            }
        },
        getRoomsByHouseId: async (req, res) => {
            try {
                let rooms = await Rooms.findAll({
                    where: {
                        houseId: req.body.house_id
                    }
                });

                return res.send(await Tools.getEquipmentsForHouse(rooms, RoomEquipments, Equipments));
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getRooms: async (req, res) => {

            try {
                let rooms = await Rooms.findAll();
                return res.send(await Tools.getEquipmentsForHouse(rooms, RoomEquipments, Equipments));

            } catch (error) {
                return res.sendStatus(500).send(error.message);
            }
        },
        createRoom: async (req, res) => {
            try {
                let room = await Rooms.create({
                    name: req.body.name,
                    houseId: req.body.house_id
                });
                return res.status(200).send(await Tools.getEquipmentsForHouse(room, RoomEquipments, Equipments));
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        deleteRoom: async (req, res) => {
            try {
                let room = await Rooms.findByPk(req.body.room_id);
                await room.destroy();
                return res.sendStatus(200);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        addEquipmentToRoom: async (req, res) => {
            try {
                if (req.body.room_id && req.body.equipment_id) {
                    await RoomEquipments.create({
                        roomId: req.body.room_id,
                        equipmentId: req.body.equipment_id
                    });
                    return res.sendStatus(200);
                } else {
                    return res.status(500).send("Il manque un id pour la pièce ou l'équipement");
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        removeEquipmentFromRoom: async (req, res) => {
            try {
                if (req.body.room_id && req.body.equipment_id) {
                    let toRemove = await RoomEquipments.findOne({
                        where: {
                            roomId: req.body.room_id,
                            equipmentId: req.body.equipment_id
                        }
                    });

                    if (toRemove) {
                        await toRemove.destroy();
                    } else {
                        return res.sendStatus(404);
                    }
                    return res.sendStatus(200);
                } else {
                    return res.status(500).send("Il manque un id pour la pièce ou l'équipement");
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        }
    }
}