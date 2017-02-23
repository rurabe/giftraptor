'use strict';

const React = require('react');
const { render } = require('react-dom');
const { createStore,compose } = require('redux');
const { Router,Route,IndexRoute,IndexRedirect,browserHistory } = require('react-router');
const Immutable = require('immutable');