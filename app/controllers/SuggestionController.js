'use strict';
module.exports = (db) => {
    const { Op } = require("sequelize");
    const Suggestions = db.equipmentSuggest;
    const EquipmentTypes = db.equipmentType;
    const Equipments = db.equipment;

    return {
        getSuggestions: async (req, res) => {
            try {
                let suggestion = await Suggestions.findAll();
                return res.status(200).json(suggestion);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getSuggestionsByCategories: async (req, res) => {

            let categories = await EquipmentTypes.findAll();
            let equipement = [];

            for (let categorie of categories) {
                equipement.push({
                    label: categorie.label,
                    equipments: await Suggestions.findAll({
                        where: {
                            typeId: categorie.id
                        }
                    })
                });
            }
            return res.status(200).send(equipement);

        },
        getSuggestionsFromEquipment: async (req, res) => {
            try {

                if (!req.body.equipment) {
                    return res.status(400).send("Il n'y a pas de valeur pour equipment dans le body");
                }

                // Contiendra tout les équipements avec le même typeId que l'équipement en req
                const suggested_equipments = await Equipments.findAll({
                    where: {
                        id: req.body.equipment.typeId,
                        watts: {
                            [Op.lt]: req.body.equipment.watts
                        }
                    }
                });

                return res.status(200).send(suggested_equipments);

            } catch (error) {
                return res.status(500).send(error.message);
            }
        }

    }
}