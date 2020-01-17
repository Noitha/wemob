'use strict';

const mongoose = require('mongoose');
const Player = mongoose.model('Player');

module.exports.RegisterUser = function(req, res)
{
    const data = req.body;
    
    var newUser = new Player(data);

    newUser.SetPassword(data.password);
    newUser.save();

    res.send(newUser);
};

module.exports.LoginUser = function(req, res)
{
    var data = JSON.parse(req.body.loginData);

    Player.find({name : data.name}, function(err, users)
    {
        if(users.length > 0)
        {
            if(users[0].ValidatePassword(data.password))
            {
                var token = users[0].GenerateAuthToken();
                res.send(token);
            }
            else
            {
                res.send("no");
            }
        }
        else
        {
            res.send("no");
        }
    });
};

module.exports.GetPlayerList = function(req, res)
{
    Player.find({}, function(err, players)
    {
        var info = "";

        for(var i = 0; i < players.length; i++)
        {

            info += players[i];
        
        }

        res.send(info);
    });
};