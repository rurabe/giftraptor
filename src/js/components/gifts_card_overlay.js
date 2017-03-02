'use strict';
const React = require('react');

const GiftsForm = require('./gifts_form');

class GiftsCardOverlay extends React.PureComponent {
  render(){
    let editButton;
    if(this.props.edit){
      editButton = (
        <button className="btn btn-primary btn-sm" onClick={this.toggleEdit}>
          <i className="fa fa-pencil"/> Edit
        </button>
      );
    }
    return (
      <div className="gift-card-front-overlay">
        <div className="overlay-actions">
          {editButton}
        </div>
        <div className="description">
          <p>{this.props.gift.get('description')}</p>
        </div>
      </div>
    );
  }

  toggleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggleEdit(e);
  }
}


module.exports = GiftsCardOverlay;