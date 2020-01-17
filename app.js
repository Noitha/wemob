'use strict';

//Get requirements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Models
const Player = require('./api/models/player');
const Enemy = require('./api/models/enemy');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TP', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}); 

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
const playerRoutes = require('./api/routes/playerRoutes');
const enemyRoutes = require('./api/routes/enemyRoutes');

playerRoutes(app);
enemyRoutes(app);

//Start listening
app.listen(port);