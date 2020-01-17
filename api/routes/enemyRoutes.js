'use strict';

module.exports = function(app) 
{
  const enemyController = require('../controllers/enemyController');
  const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/enemy')
        .post(tokenAuthenticator.Authenticate, enemyController.AddEnemy);

    app.route('/listEnemies')
        .get(tokenAuthenticator.Authenticate, enemyController.GetEnemyList);
};