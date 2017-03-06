'use strict';
const React = require('react');
const { connect } = require('react-redux');
const cn = require('classnames');

const FriendsActions = require('../actions/friends_actions');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state,ownProps){
  return {};
};

const mapDispatchToProps = function(dispatch){
  return {
    mergePeople: dispatchMerge(dispatch,'people'),
  };
};

class FriendsButton extends React.PureComponent {

  render(){
    const classes = cn('btn friend-button btn-sm',{
      'btn-primary': this.props.person.get('is_friend'),
      'btn-success': !this.props.person.get('is_friend'),
    });

    const text = this.props.person.get('is_friend') ? 'Unfollow' : 'Follow';

    return (
      <button className={classes} onClick={this.onClick}>{text}</button>
    );
  }

  onClick = (e) => {
    if(this.props.person.get('is_friend')){
      FriendsActions.destroy(this.props.person.get('slug')).then(this.props.mergePeople);
    } else {
      FriendsActions.create(this.props.person.get('slug')).then(this.props.mergePeople);
    }

  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(FriendsButton);