module.exports = (app, db) => {
    var glob = require('glob'),
        path = require('path');
    glob.sync('./app/routes/**.routes.js').forEach(
        (file) => {
            const route = require(path.resolve(file));
            route(app, db);
        }
    );
};
