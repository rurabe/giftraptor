'use strict';
const React = require('react');

const GiftsCard = require('./gifts_card');
const GiftsNewCard = require('./gifts_new_card');

class GiftsGrid extends React.PureComponent {
  render(){
    const gifts = this.props.gifts.toIndexedSeq().map(g => {
      return <GiftsCard key={g.get('id')} gift={g} edit={this.props.edit}/>
    });

    let newCard;
    if(this.props.edit){
      newCard = <GiftsNewCard />
    }

    return (
      <div className="row">
        {gifts}
        {newCard}
      </div>
    );
  }
}

module.exports = GiftsGrid;