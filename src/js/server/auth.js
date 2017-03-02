'use strict';
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
const UsersQueries = require('../queries/users_queries');

const strategyOptions = {
  passReqToCallback: true,
  usernameField: 'email'
};

const facebookStrategyOptions = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8000/auth/facebook/callback',
  scope: ['email','user_friends'],
  profileFields: ['id','displayName','email','picture'],
  passReqToCallback: true
};

const loginOptions = { 
  failureRedirect: '/login', 
  failureFlash: true,
};

const Auth = {
  init: function(app){

    // facebook
    Passport.use(new FacebookStrategy(facebookStrategyOptions,
      function(req,accessToken,refreshToken,profile,done){
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const user = {
          name: profile.displayName,
          email: profile.emails.map(e => e.value)[0],
          picture: profile.photos.map(p => p.value)[0],
        };
        UsersQueries.upsert(profile.provider,profile.id,user,ip).then(user => {
          done(null,user);
        });
      }
    ));

    // password based auth
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
      return done(null,{id: id});
      // return UsersQueries.findById(id).then(user => {
      //   done(null,user); return null;
      // }).catch(e => {
      //   done(e,null); return null;
      // });
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
  facebook: function(){
    return Passport.authenticate('facebook');
  },
  facebookCallback: function(){
    return Passport.authenticate('facebook',{ failureRedirect: '/login' });
  }
};

module.exports = Auth;