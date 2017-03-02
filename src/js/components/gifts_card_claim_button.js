'use strict';
const React = require('react');
const { connect } = require('react-redux');

const ClaimsActions = require('../actions/claims_actions');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state){
  return {};
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts')
  };
};

class GiftsCardClaimButton extends React.PureComponent {
  render(){
    const gifterSlug = this.props.gift.get('gifter_slug');
    console.log(gifterSlug,this.props.my_slug)
    if(!gifterSlug){
      return (
        <button className="claim-button unclaimed" onClick={this.claim}>I'll get that!</button>
      );
    } else {
      if(gifterSlug === this.props.my_slug){
        return (
          <button className="claim-button claimed-by-me" onClick={this.unclaim}>Unclaim</button>
        );
      } else {
        return (
          <button className="claim-button claimed" disabled>Claimed by {this.props.gift.get('gifter_name')}</button>
        );        
      }
    }
  }

  claim = (e) => {
    e.stopPropagation();
    e.preventDefault();
    ClaimsActions.create(this.props.gift.get('id')).then( gifts => {
      console.log(gifts)
      this.props.mergeGifts(gifts);
    });
  }

  unclaim = (e) => {
    e.stopPropagation();
    e.preventDefault();
    ClaimsActions.destroy(this.props.gift.get('id')).then( gifts => {
      console.log(gifts)
      this.props.mergeGifts(gifts);
    });
  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(GiftsCardClaimButton);