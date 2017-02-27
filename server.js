'use strict';

// env
require('dotenv').load();

// app
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 3000));

// static
app.use('/assets',express.static('public'));
app.use(express.static('uploads'));

// views
app.set('views', './src/html');
app.set('view engine', 'pug');

// body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sessions
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
app.use(session({
  store: new RedisStore({ url: process.env.REDIS_URL, prefix: 'gr:' }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
}));

// flash
const flash = require('connect-flash');
app.use(flash());
app.use(function(req,res,next){
  res.locals.flash = {
    error: req.flash('error'),
    info: req.flash('info'),
    success: req.flash('success'),
  };
  next();
});

// override methods from forms
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const Routes = require('./src/js/server/routes');
Routes.init(app);

app.listen(app.get('port'),function(){
  console.log('Server up on',app.get('port'),'in',process.env.NODE_ENV);
});