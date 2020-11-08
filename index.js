require('dotenv').config();
const { Sequelize } = require('sequelize');
const cors = require('cors');
const express = require('express');
let routes = require('./app/routes');
let db = require('./app/models');
require('express-group-routes');
const path = require('path');
const https = require('https')
const fs = require('fs');
const Tools = require('./app/utils/Tools');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

db.sequelize.sync()
    .then(() => {
        console.log('Database initialized');
        routes(app, db);
        https.createServer({
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
        }, app).listen(port, () => {
            console.log('Listening...')
        })
    }).catch((error) => {
    console.log(error);
    console.log('Une erreur est survenue dans les dépendances du index.js');
});

