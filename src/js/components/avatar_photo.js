'use strict';
const React = require('react');

class AvatarPhoto extends React.PureComponent {
  render(){
    let image;
    if(this.props.photo){
      image = <img src={this.props.photo} />
    }
    
    return (
      <div className="avatar-photo">
        {image}
      </div>
    );
  }
}

module.exports = AvatarPhoto;