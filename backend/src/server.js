const express = require('express');
const mongoose = require('mongoose');
const routes = express.Router();
const routesApi = require('./routes/api');
const routesAuth = require('./routes/auth');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/database-teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 8080;

routes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use(routesAuth);
app.use(routesApi);
app.use( '/', express.static( path.resolve(__dirname, '..', 'public') ) );

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
