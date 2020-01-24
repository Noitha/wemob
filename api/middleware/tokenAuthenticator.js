'use strict';

const jwt = require('jsonwebtoken');
const player = require('../models/player');

exports.Authenticate = function(request, response, next)
{
    try
    {
        const headerData = request.header('Authorization');
        
        if(!headerData)
        {
            console.log("No header data");
            throw new Error('No authorization provided. Expecting bearer token!');
        }

        const token = headerData.replace('Bearer ', '');
        
        const data = jwt.verify(token, process.env.JWT_KEY);

        const retrievedPlayer = player.findOne({name : data.name, 'tokens.token' : token});

        if(!retrievedPlayer)
        {
            throw new Error("Yeeeet");
        }

        next();
    }
    catch(error)
    {
        response.status(401).send({ error: 'Not authorized to access this resource', message: error.message});
    }
};