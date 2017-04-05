'use strict';
const React = require('react');
const { connect } = require('react-redux');
const cn = require('classnames');

const GiftsActions = require('../actions/gifts_actions');
const PictureActions = require('../actions/picture_actions');

const GiftsForm = require('./gifts_form');
const GiftsCardOverlay = require('./gifts_card_overlay');
const GiftsCardClaimButton = require('./gifts_card_claim_button');

const { dispatchMerge } = require('../helpers/dispatch_helpers');
const { referify } = require('../helpers/link_helpers');


const mapStateToProps = function(state,ownProps){
  const giftId = ownProps.gift.get('id').toString();
  const forms = state.form.gifts;
  return {
    formData: ((forms && forms[giftId]) ? forms[giftId].values : {}),
    my_slug: state.user.slug,
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts')
  };
};


class GiftsCard extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {edit: false};
  }

  render(){
    const classes = cn('gift-card',{edit: this.state.edit});
    const link = referify(this.props.gift.get('link')) ||
      `https://www.google.com/#q=${this.props.gift.get('name').replace(/\s/g,'+')}`;


    let back;
    let claimButton;
    if(this.props.edit){
      back =  (
        <div className="gift-card-back">
          <GiftsForm 
            onCancel={this.toggleEdit} 
            onSubmit={this.onSubmit} 
            gift={this.props.gift} 
            form={`gifts[${this.props.gift.get('id')}]`}
          />
          <button className="btn btn-sm btn-success update-button" onClick={this.onSubmit}>Update</button>
          <button className="btn btn-sm btn-primary delete-button" onClick={this.onDestroy}><i className="fa fa-trash" /></button>
        </div>
      );
    } else {
      claimButton = <GiftsCardClaimButton gift={this.props.gift} my_slug={this.props.my_slug}/>;
    }

    return (
      <div className={classes} >
        <div className="gift-card-inner">
          <a href={link} target="_blank" className="gift-card-link">
            <div className="gift-card-front gift-card-front-show"> 
              <h4 className="name">{this.props.gift.get('name')}</h4>
              {claimButton}
              <GiftsCardOverlay gift={this.props.gift} edit={this.props.edit} toggleEdit={this.toggleEdit}/>
              <img className="gift-card-image" src={this.props.gift.get('image')} />
            </div>
          </a>
          {back}
        </div>
      </div>
    );
  }

  toggleEdit = (e) => {
    this.setState({edit: !this.state.edit});
  }

  onSubmit = (e) => {
    GiftsActions.update(this.props.gift.get('id'),this.props.formData).then( data => {
      this.props.mergeGifts(data);
      this.setState({edit: !this.state.edit});
    });
  }

  onDestroy = (e) => {
    GiftsActions.destroy(this.props.gift.get('id')).then(this.props.mergeGifts);
  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(GiftsCard);