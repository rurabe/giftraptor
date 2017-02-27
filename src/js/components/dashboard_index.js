'use strict';
const React = require('react');
const { connect } = require('react-redux');

const GiftsActions = require('../actions/gifts_actions');

const GiftsGrid = require('./gifts_grid');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state){
  return {};
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts')
  };
};

class DashboardIndex extends React.PureComponent {

  componentWillMount(){
    GiftsActions.index().then(this.props.mergeGifts);
  }

  render(){
    return (
      <div id="dashboardIndex">
        <div className="page-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="row">
          <div className="col-md-9">
            <GiftsGrid />
          </div>
          <div className="col-md-3">
            Feed
          </div>
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DashboardIndex);