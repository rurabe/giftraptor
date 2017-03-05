'use strict';
const React = require('react');
const { connect } = require('react-redux');

const GiftsActions = require('../actions/gifts_actions');
const FriendsActions = require('../actions/friends_actions');

const GiftsGrid = require('./gifts_grid');
const Feed = require('./feed');
const FriendsList = require('./friends_list');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state){
  return {
    gifts: state.gifts.filter(g => g.get('user_id') === state.user.id),
    friends: state.people.filter(p => p.get('is_friend')),
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts'),
    mergePeople: dispatchMerge(dispatch,'people'),
  };
};

class DashboardIndex extends React.PureComponent {

  componentWillMount(){
    GiftsActions.index().then(this.props.mergeGifts);
    FriendsActions.index().then(this.props.mergePeople);
  }

  render(){
    return (
      <div id="dashboardIndex">
        <div className="page-header">
          <h1>My Wishlist</h1>
        </div>
        <div className="row">
          <div className="col-md-9">
            <GiftsGrid gifts={this.props.gifts} edit={true}/>
          </div>
          <div className="col-md-3">
            <Feed />
            <FriendsList />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(DashboardIndex);