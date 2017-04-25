'use strict';
const React = require('react');
const { connect } = require('react-redux');

const ShoppingActions = require('../actions/shopping_actions');
const FriendsActions = require('../actions/friends_actions');

const GiftsGrid = require('./gifts_grid');
const Loading = require('./loading');
const FriendsList = require('./friends_list');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state,ownProps){
  const peopleGifts = state.gifts.filter(g => {
    return g.get('gifter_slug') === state.user.slug;
  }).groupBy(g => {
    return g.get('user_slug');
  });

  return {
    people_gifts: peopleGifts,
    friends: state.people.filter(p => p.get('is_friend')),
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts'),
    mergePeople: dispatchMerge(dispatch,'people'),
  };
};

class ShoppingIndex extends React.PureComponent {

  componentDidMount = () => this.getData();
  componentDidUpdate = () => this.getData();

  getData = () => {
    ShoppingActions.index().then(this.props.mergeGifts);
    FriendsActions.index().then(this.props.mergePeople);
  }

  render(){
    if(this.props.people_gifts){
      console.log(this.props.people_gifts.toJSON())
      const people = this.props.people_gifts.map((gifts) => {
        return (
          <div className="row">
            <div className="col-md-12">
              <h2>{gifts.first().get('user_name')}</h2>
              <GiftsGrid gifts={gifts} edit={false}/>
            </div>
          </div>
        );
      });

      return (
        <div id="shoppingIndex">
          <div className="page-header">
            <h1>Shopping List</h1>
          </div>
          <div className="row">
            <div className="col-md-9">
              {people}
            </div>
            <div className="col-md-3">
              <h3>Friends</h3>
              <FriendsList friends={this.props.friends}/>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />
    }

  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(ShoppingIndex);