'use strict';
module.exports = (app, db) => {

    const HouseController = require('../controllers/HouseController')(db);
    const RoomController = require('../controllers/RoomController')(db);
    const EquipmentController = require('../controllers/equipment')(db);
    const UserController = require('../controllers/user')(db);
    const EquipmentTypeController = require('../controllers/EquipmentTypeController')(db);
    const SuggestionController = require('../controllers/SuggestionController')(db);
    const AuthMiddleware = require('../middlewares/AuthMiddleware')(db);


    app.get('/', (req, res) => {
        res.send('API works');
    });

    // House routes
    app.post('/user/houses', HouseController.getHouseByUserId);
    app.get('/houses', HouseController.getHouses);
    app.post('/house/create', HouseController.createHouse);
    app.post('/house/delete', HouseController.deleteHouse);

    // Room routes
    app.get('/room/:id', RoomController.getRoomById);
    app.post('/house/rooms', RoomController.getRoomsByHouseId);
    app.get('/rooms', RoomController.getRooms);
    app.post('/room/create', RoomController.createRoom);
    app.post('/room/delete', RoomController.deleteRoom);
    app.post('/room/add/equipment', RoomController.addEquipmentToRoom);
    app.post('/room/remove/equipment', RoomController.removeEquipmentFromRoom);


    // Equipment routes
    app.get('/equipments/all', EquipmentController.getAllEquipment)
    app.get('/equipment/:id', EquipmentController.getEquipmentById)
    app.post('/equipments/create/', EquipmentController.createEquipment)
    app.post('/equipments/delete/', EquipmentController.deleteById)
    app.get('/equipments/sorted', EquipmentTypeController.getEquipmentsByCategories)
    app.post('/equipments/update', EquipmentController.update)
    app.get('/equipments/last', EquipmentController.getLastEquipment);
    app.get('/equipments/types', EquipmentTypeController.getTypes);

    // User routes
    app.post('/user/register', UserController.register)
    app.post('/user/login', UserController.login)
    app.post('/user/logout', UserController.logout)
    app.get('/user/all', UserController.allUser) // Just for debugging purposes
    app.post('/user/fromToken', UserController.getUserFromToken)

    //Suggestion routes
    app.get('/suggestions', SuggestionController.getSuggestions)
    app.get('/suggestions/sorted', SuggestionController.getSuggestionsByCategories)
    app.get('/suggestions/fromEquipment', SuggestionController.getSuggestionsFromEquipment)

};
