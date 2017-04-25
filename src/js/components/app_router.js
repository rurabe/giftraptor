'use strict';
const React = require('react');
const { createStore,compose } = require('redux');
const { Provider } = require('react-redux');
const { Router,Route,IndexRoute,IndexRedirect,browserHistory } = require('react-router');

const RootReducer = require('../reducers/root_reducer');

const AppLayout = require('./app_layout');
const DashboardIndex = require('./dashboard_index');
const PeopleShow = require('./people_show');
const ShoppingIndex = require('./shopping_index');

const AppRouter = function(props){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(RootReducer,props.initialState,composeEnhancers());
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={AppLayout}>
          <IndexRoute component={DashboardIndex} />
          <Route path="/users/:slug" component={PeopleShow}/>
          <Route path="/shopping" component={ShoppingIndex} />
        </Route>
      </Router>
    </Provider>
  );
};

module.exports = AppRouter;