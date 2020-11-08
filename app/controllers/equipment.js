'use strict';
module.exports = (db) => {
    const Equipment = db.equipment;
    const RoomEquipment = db.room_equipment;
    const Tools = require('../utils/Tools');

    return {
        getAllEquipment: async (req, res) => {
            try {

                let equipmentsTotal = [];

                const equipments = await Equipment.findAll();

                for (let equipment of equipments) {

                    let roomEquip = await RoomEquipment.findOne({
                        where: {
                            equipmentId: equipment.id
                        }
                    });

                    equipmentsTotal.push({
                        id: equipment.id,
                        name: equipment.name,
                        watts: equipment.watts,
                        typeId: equipment.typeId,
                        roomId: roomEquip.roomId,
                        quantity: roomEquip.quantity
                    });
                }

                return res.status(200).send(equipmentsTotal);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getEquipmentById: async (req, res) => {
            const id = req.params.id
            try {
                const equipment = await Equipment.findByPk(id);
                if (equipment === null) {
                    return res.status(404).send("Not Found");
                }

                let roomEquip = await RoomEquipment.findOne({
                    where: {
                        equipmentId: equipment.id
                    }
                });

                return res.send({
                    id: equipment.id,
                    name: equipment.name,
                    watts: equipment.watts,
                    typeId: equipment.typeId,
                    roomId: roomEquip.roomId,
                    quantity: roomEquip.quantity
                })

            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        createEquipment: async (req, res) =>{
            const name = req.body.name
            const watts = req.body.watts
            try {

                if (!req.body.room_id) {
                    return res.status(500).send("Il n'y a pas de room_id");
                }

                let equipment = await Equipment.create({
                    id: Tools.uuid(),
                    name: name,
                    watts: watts,
                });

                await RoomEquipment.create({
                    id: Tools.uuid(),
                    roomId: req.body.room_id,
                    equipmentId: equipment.dataValues.id,
                    quantity: req.body.quantity || 1
                });

                return res.sendStatus(200);
            }catch (err) {
                return res.status(500).send(err);
            }
        },
        deleteById: async (req, res) => {
            try {
                const id = req.body.id
                const equipments = await Equipment.findByPk(id);
                if (equipments === null) {
                    return res.status(404).send("Not Found");
                }else {

                    let room_equip = await RoomEquipment.findOne({
                        where: {
                            equipmentId: equipments.dataValues.id
                        }
                    });


                    if (room_equip) {
                        await room_equip.destroy();
                    }
                    await equipments.destroy()
                    return res.sendStatus(200);
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        update: async (req, res) => {
            try {

                const equipment_id = req.body.equipment_id;
                const name = req.body.name;
                const watts = req.body.watts;
                

                let equipment = await Equipment.findOne({
                    where: {
                       id: equipment_id
                    }
                });

                if (equipment) {
                    await equipment.update({
                        name: name,
                        watts: watts || null
                    });

                    let roomEquip = await RoomEquipment.findOne({
                        where: {
                            equipmentId: equipment.id
                        }
                    });

                    if (roomEquip) {
                        await roomEquip.update({
                            quantity: req.body.quantity ? req.body.quantity : 1
                        });
                    }

                    return res.status(200).send(equipment);
                } else {
                    return res.status(404).send("Aucun équipement ne correspond à l'id");
                }

            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getLastEquipment: async (req, res) => {
            try {
                let equipment = await Equipment.findAll({
                    limit: 1,
                    order: [ [ 'created_at', 'DESC' ]]
                });

                equipment = equipment[0];

                let roomEquip = await RoomEquipment.findOne({
                    where: {
                        equipmentId: equipment.dataValues.id
                    }
                });

                return res.send({
                    id: equipment.id,
                    name: equipment.name,
                    watts: equipment.watts,
                    typeId: equipment.typeId,
                    roomId: roomEquip.roomId,
                    quantity: roomEquip.quantity
                })

            } catch (error) {
                return res.status(500).send(error);
            }
        }
    }
};
