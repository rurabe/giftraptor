'use strict';
const React = require('react');
const { connect } = require('react-redux');

const GiftsCard = require('./gifts_card');
const GiftsNewCard = require('./gifts_new_card');


const mapStateToProps = function(state){
  return {
    gifts: state.gifts
  }
}

class GiftsGrid extends React.PureComponent {
  render(){
    const gifts = this.props.gifts.toIndexedSeq().map(g => {
      return <GiftsCard key={g.get('id')} gift={g} />
    });

    return (
      <div className="row">
        {gifts}
        <GiftsNewCard />
      </div>
    );
  }
}

module.exports = connect(mapStateToProps)(GiftsGrid);