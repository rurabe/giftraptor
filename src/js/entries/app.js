'use strict';
const React = require('react');
const { render } = require('react-dom');

const AppRouter = require('../components/app_router');

const App = function(){
  const dehydratedState = document.getElementById('main').attributes['data-initial-state'].value;
  const initialState = JSON.parse(dehydratedState);
  return <AppRouter initialState={initialState} />;
}

render(<App />,document.getElementById('main'));