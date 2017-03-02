'use strict';
const { combineReducers } = require('redux');
const ReduxForm = require('redux-form');
const UserReducer = require('./user_reducer');
const StandardReducer = require('./standard_reducer');

const RootReducer = combineReducers({
  form: ReduxForm.reducer,
  user: UserReducer,
  gifts: StandardReducer('gifts'),
  people: StandardReducer('people'),
});

module.exports = RootReducer;