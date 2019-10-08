const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/database-teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use( '/files', express.static( path.resolve(__dirname, '..', 'uploads') ) );
app.use( '/', express.static( path.resolve(__dirname, '..', 'public') ) );

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
