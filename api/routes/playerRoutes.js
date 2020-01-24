'use strict';

module.exports = function(app) 
{
  const playerController = require('../controllers/playerController');

    app.route('/register')
        .post(playerController.RegisterUser);

    app.route('/login')
        .post(playerController.LoginUser);

    app.route('/listPlayers')
        .get(playerController.GetPlayerList);
};