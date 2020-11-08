'use strict';
module.exports = (db) => {
    const AuthToken = db.AuthToken;
    const Tools = require('../utils/Tools');

    return {

        checkToken: async (req, res, next) => {

            if (!req.body.token) {
                return res.status(401).send("Il manque le token");
            }
            next();
        }

    }
}