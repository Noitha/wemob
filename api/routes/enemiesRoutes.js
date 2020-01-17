'use strict';

module.exports = function(app)
{
    const enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/enemies')
        .get(tokenAuthenticator.Authenticate, enemyController.GetEnemyList);
};