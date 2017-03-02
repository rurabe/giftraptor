'use strict';
const React = require('react');
const { connect } = require('react-redux');

const GiftsActions = require('../actions/gifts_actions');
const UsersActions = require('../actions/users_actions');

const GiftsGrid = require('./gifts_grid');
const Loading = require('./loading');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state,ownProps){
  return {
    person: state.people.get(ownProps.params.slug),
    gifts: state.gifts.filter(g => g.get('user_slug') === ownProps.params.slug),
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts'),
    mergePeople: dispatchMerge(dispatch,'people'),
  };
};

class UsersShow extends React.PureComponent {

  componentWillMount(){
    GiftsActions.index().then(this.props.mergeGifts);
    UsersActions.show(this.props.params.slug).then(data => {
      this.props.mergeGifts(data.gifts);
      this.props.mergePeople(data.people);
    });
  }

  render(){
    if(this.props.person){
      return (
        <div id="usersShow">
          <div className="page-header">
            <h1>{this.props.person.get('name')}'s Wishlist</h1>
          </div>
          <div className="row">
            <div className="col-md-9">
              <GiftsGrid gifts={this.props.gifts} edit={false}/>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />
    }

  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(UsersShow);