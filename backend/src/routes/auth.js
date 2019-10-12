const express = require('express');

const SessionController = require('../controllers/SessionController');
const UserController = require('../controllers/UserController');

const routes = express.Router();

routes.post('/login', SessionController.login);
routes.post('/register', UserController.create);

module.exports = routes;
