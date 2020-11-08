'use strict';
module.exports = (db) => {
    const Rooms = db.room;
    const Equipments = db.equipment;
    const EquipmentTypes = db.equipmentType;
    const Tools = require('../utils/Tools');
    return {
        getEquipmentsByCategories: async (req, res) => {

            let categories = await EquipmentTypes.findAll();
            let equipement = [];

            for (let categorie of categories) {
                equipement.push({
                    label: categorie.label,
                    equipments: await Equipments.findAll({
                        where: {
                            typeId: categorie.id
                        }
                    })
                });
            }
            return res.status(200).send(equipement);

        },

        getTypes: async (req, res) => {
            let types = await EquipmentTypes.findAll({
                attributes: ['label']
            });

            return res.send(types);
        }
    }
}