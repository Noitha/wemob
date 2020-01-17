'use strict';

const mongoose = require('mongoose');
const Enemy = mongoose.model('Enemy');

module.exports.AddEnemy = function(req, res)
{
    const data = req.body;
    const newEnemy = new Enemy(data);

    newEnemy.save();

    res.send(newEnemy);
};

module.exports.GetEnemyList = function(req, res)
{
    Enemy.find({}, function(err, enemies)
    {
        var info = "";

        for(var i = 0; i < enemies.length; i++)
        {

            info += enemies[i];
        
        }

        res.send(info);
    });
};