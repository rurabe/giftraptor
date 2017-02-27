'use strict';
const React = require('react');

const AppNavbar = require('./app_navbar');

class AppLayout extends React.PureComponent {
  render(){
    return (
      <div id="app">
        <AppNavbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = AppLayout;