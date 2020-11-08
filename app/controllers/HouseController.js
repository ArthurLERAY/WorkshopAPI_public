'use strict';
module.exports = (db) => {
    const Houses = db.house;
    const Rooms = db.room;
    const Tools = require('../utils/Tools');
    return {
        getHouseByUserId: async (req, res) => {
            try {

                let houses = await Houses.findAll({
                    where: {
                        id: req.body.user_id
                    }
                });


                return res.send(await Tools.getRoomsForHouses(Rooms, houses));
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getHouses: async (req, res) => {
            try {
                let houses = await Houses.findAll();
                res.send(await Tools.getRoomsForHouses(Rooms, houses));
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        createHouse: async (req, res) => {
            try {
                let house = await Houses.create({
                    name: req.body.name,
                    userId: req.body.user_id,
                });
                return res.status(200).send(await Tools.getRoomsForHouses(Rooms, house));
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        deleteHouse: async (req, res) => {
            try {
                let house = await Houses.findByPk(req.body.house_id);

                if (house) {
                    // Find if house had any rooms
                    let rooms = await Tools.getRoomsForHouses(Rooms, house);
                    if (rooms && rooms.length > 0) {
                        for (let room of rooms) {
                            await room.destroy();
                        }
                    }
                    await house.destroy();
                } else {
                    return res.sendStatus(404);
                }

                res.sendStatus(200);
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    }
}