'use strict';
module.exports = (db) => {
    const User = db.User;
    const AuthToken = db.AuthToken;
    const crypto = require('crypto');
    const Tools = require('../utils/Tools');

    return {
        register: async (req, res) => {
            try {
                const pass = req.body.password
                const email = req.body.email

                if (!email || !pass) {
                    return res.status(400).send(
                        'Email ou mot de passe vide'
                    );
                }else{

                    let userSearch = await User.findOne({
                        where: {
                            email: email
                        }
                    });

                    if (userSearch) {
                        return res.status(400).send("Cet email existe d�j�");
                    }

                    let user = await User.create({
                        id: Tools.uuid(),
                        email: email,
                        password:pass
                    });
                    return res.status(200).send(user);
                }
            } catch (err) {
                return res.status(500).send(err);
            }
        },
        login: async (req, res) => {
            const {email, password} = req.body;
            const getUser = async email => {
                return await User.findOne({
                    where: email,
                })
            }
            if (!email || !password) {
                return res.status(400).send(
                    'Email ou mot de passe vide'
                );
            } else {
                let user = await getUser({email})
                if (!user) {
                    return res.status(401).send('aucun utilisateur trouvé');
                }
                if (user.password === password) {

                    const getInfoUser = await User.findOne({
                        where: {id: user.id},
                        attributes: ["id", "email"]
                    });

                    const mytoken = await AuthToken.findOne({where: {userId: user.id}});

                    if (mytoken) {
                        res.status(401).send("Déja connecté");
                    } else {
                        let token = crypto.randomBytes(64).toString('hex');
                        await AuthToken.create({
                            id: Tools.uuid(),
                            userId: getInfoUser.id,
                            token: token
                        });
                        return res.status(200).send({getInfoUser, token})
                    }
                }
                else {
                    return res.status(401).send('Mot de passe incorrect');
                }
            }
        },
        logout: async (req, res) => {
            const { id } = await req.body

            const getUser = async id => {
                return await User.findOne({
                    where: id,
                })
            }
            let user = await getUser({id})
            if (!user) {
                return res.status(401).send('aucun utilisateur trouver');
            }
            const tokenUser = await AuthToken.findOne({where: {userId: user.id}});
            if (tokenUser){
                await tokenUser.destroy()
                return res.status(200).send('Utilisateur déconnecté')
            }else{
                return res.status(401).send('utilisateur non connecté')
            }
            return res.status(404).send('Not found')
        },
        allUser: async (req, res) => {
            try {
                const users = await User.findAll();
                return res.status(200).json(users);
            } catch (error) {
                return res.status(500).send(error.message);
            }
        },
        getUserFromToken: async (req, res) => {
            try {
                if (req.body.token) {
                    const token = req.body.token;

                    let tokenRow = await AuthToken.findOne({
                        where: {
                            token: token
                        }
                    });

                    let user = await User.findOne({
                        attributes: ['id', 'email'],
                        where: {
                            id: tokenRow.dataValues.userId
                        }
                    });

                    return res.send(user);

                } else {
                    return res.status(500).send("Pas de token passé en paramètre");
                }
            } catch (error) {
                return res.status(500).send(error.message);
            }
        }

    }
};
