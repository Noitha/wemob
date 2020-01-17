'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var enemySchema = new Schema
(
    {
        name: 
        {
            type: String,
            required: true
        },

        damage:
        {
            type: String,
            required: true
        },

        position:
        {
            x :{
                type : Number,
                required: true
            },
            y :{
                type: Number,
                required: true
            }
        }
    }
);

module.exports = mongoose.model('Enemy', enemySchema);