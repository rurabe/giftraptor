'use strict';

const Auth = require('./auth');

const AppController = require('../controllers/app_controller');

const Routes = {
  init: function(app){
    app.get('/',AppController.index)
  }
};

module.exports = Routes;