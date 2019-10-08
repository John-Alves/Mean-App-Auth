const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadConfig = require('./config/upload');

const DashboardController = require('./controllers/DashboardController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

routes.post('/sessions', SessionController.create);

routes.get('/dashboard', DashboardController.show);

routes.post('/users', UserController.create);

module.exports = routes;
