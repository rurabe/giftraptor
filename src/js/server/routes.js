'use strict';
const express = require('express');
const Auth = require('./auth');

const AppController = require('../controllers/app_controller');
const SessionsController = require('../controllers/sessions_controller');
const UsersController = require('../controllers/users_controller');
const PeopleController = require('../controllers/people_controller');
const GiftsController = require('../controllers/gifts_controller');
const ClaimsController = require('../controllers/claims_controller');
const FriendsController = require('../controllers/friends_controller');
const SearchController = require('../controllers/search_controller');

const reqAuth = (req,res,next) => { 
  if(req.isAuthenticated()){
    next();
  } else {
    req.session.redirect_to = req.path;
    res.redirect('/');
  }
};
const noAuth = (req,res,next) => { return !req.isAuthenticated() ? next() : res.redirect('/'); };
const returnToPage = (req,res) => { res.redirect(req.session.redirect_to || '/'); delete req.session.redirect_to; };

const Routes = {
  init: function(app){
    Auth.init(app);
    
    app.get('/',AppController.index);

    app.get('/login',noAuth,SessionsController.new);
    app.post('/login',noAuth,Auth.loginHandler(),returnToPage);

    app.get('/auth/facebook',noAuth,Auth.facebook());
    app.get('/auth/facebook/callback',noAuth,Auth.facebookCallback(),returnToPage);

    app.delete('/logout',reqAuth,Auth.logoutHandler());

    app.post('/users',noAuth,UsersController.create);

    app.get('/users/:slug',reqAuth,AppController.index);


    const api = express.Router();
    api.use(reqAuth); // every api request should be authorized
    api.get('/gifts',GiftsController.index);
    api.post('/gifts',GiftsController.create);
    api.put('/gifts/:id',GiftsController.update);
    api.post('/gifts/:id/claims',ClaimsController.create);
    api.delete('/gifts/:id/unclaims',ClaimsController.destroy);

    api.get('/people/:slug',PeopleController.show);

    api.get('/search',SearchController.index);

    api.get('/friends',FriendsController.index);
    api.post('/friends/:slug',FriendsController.create);
    api.delete('/friends/:slug',FriendsController.destroy);

    app.use('/api',api);
  }
};

module.exports = Routes;