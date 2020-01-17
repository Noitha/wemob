'use strict';

//Get requirements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pug = require('pug');
const dotenv = require('dotenv').config();

const app = express();
app.set('view engine', 'pug');

//Models
const Player = require('./api/models/player');
const Enemy = require('./api/models/enemy');

//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/WEMOB3', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
const playerRoutes = require('./api/routes/playerRoutes');
const enemyRoutes = require('./api/routes/enemyRoutes');

playerRoutes(app);
enemyRoutes(app);


app.get('/', async function (req, res) {

    var playerMap = {};
    var enemyMap = {};

    await Player.find({}, function (err, players) {
        players.forEach(function (player) {
            playerMap[player.name] = player.name;
        });
    });

    await Enemy.find({}, function (err, enemies) {
        enemies.forEach(function (enemy) {
            enemyMap[enemy.name] = { name: enemy.name, damage: enemy.damage, position: enemy.position };
        });
    });

    res.render('index.pug',
        {
            players: playerMap,
            enemies: enemyMap
        });

});

app.get('/showEnemy/:name', async function (req, res) {
    var enemyName = req.params.name;
    var enemyData = {};

    await Enemy.find({ name: enemyName }, function (err, enemies) {
        if (enemies.length > 0) {
            enemyData = { name: enemies[0].name, damage: enemies[0].damage, position: enemies[0].position };
        }
    });

    res.render('enemyTemplate.pug',
        {
            enemyName: enemyName,
            enemyData: enemyData
        });
});

//Start listening
app.listen(3000);