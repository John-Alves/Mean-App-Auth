const express = require('express');
const path = require('path');

const DashboardController = require('../controllers/DashboardController');
const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');

const routes = express.Router();

routes.use(SessionController.verifyWebToken);

routes.get('/user', UserController.show);
routes.post('/dashboard', DashboardController.show);

module.exports = routes;
