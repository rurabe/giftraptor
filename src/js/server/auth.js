'use strict';
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const UsersQueries = require('../queries/users_queries');

const strategyOptions = {
  passReqToCallback: true
};

const loginOptions = { 
  failureRedirect: '/', 
  failureFlash: true,
};

const Auth = {
  init: function(app){
    Passport.use(new LocalStrategy(strategyOptions,
      function(req,email,password,done) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        return UsersQueries.authenticate(email,password,ip).then(user => {
          return done(null,user);
        }).catch(e => {
          return done(null,false,{message: e.message});
        });
      }
    ));

    Passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    Passport.deserializeUser(function(id, done) {
      return UsersQueries.find({id: id}).then(user => {
        done(null,user); return null;
      }).catch(e => {
        done(e,null); return null;
      });
    });

    app.use(Passport.initialize());
    app.use(Passport.session());

  },
  loginHandler: function(){
    return Passport.authenticate('local',loginOptions);
  },
  logoutHandler: function(){
    return function(req,res){
      req.logout(); // passport method
      res.redirect('/');
    };
  },
};

module.exports = Auth;