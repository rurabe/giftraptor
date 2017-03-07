'use strict';
const React = require('react');
const { Link } = require('react-router');

const AvatarPhoto = require('./avatar_photo');

class FriendsList extends React.PureComponent {
  render(){
    let friends = this.props.friends.toIndexedSeq().map(friend => {
      return (

        <Link to={`/users/${friend.get('slug')}`} key={friend.get('slug')}>
          <div className="friend-row">
            <AvatarPhoto photo={friend.get('picture')} />
            <div className="friend-name">
              <span>{friend.get('name')}</span>
            </div>
          </div>
        </Link>
      );
    });

    if(this.props.friends.size === 0){
      friends = (
        <div className="friend-row">
          Search for your friends on the navbar above
        </div>
      );
    }

    return (
      <div className="row friends-list">
        <div className="col-md-12">
          {friends}
        </div>
      </div>
    );
  }
}

module.exports = FriendsList;