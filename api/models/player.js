'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

var playerSchema = new Schema
(
    {
        name: 
        {
            type: String,
            required: true,
            index: {unique: true}
        },

        password: 
        {
            type: String,
            required: true
        },

        salt: 
        {

            type: String,
            required: true
        },

        tokens: 
        [
            {
                token: 
                {
                    type: String,
                    require: true
                }
            }
        ]
    }
);

playerSchema.methods.SetPassword = function(password)
{
    this.salt = crypto.randomBytes(32).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

playerSchema.methods.ValidatePassword = function(password)
{
    return this.password === crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

playerSchema.methods.GenerateAuthToken = function()
{
    const player = this;
    const token = jwt.sign({name : player.name}, process.env.JWT_KEY);

    player.tokens = player.tokens.concat({token});
    player.save();
    return token;
};

module.exports = mongoose.model('Player', playerSchema);