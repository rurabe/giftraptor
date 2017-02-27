'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { reset } = require('redux-form');
const cn = require('classnames');

const GiftsActions = require('../actions/gifts_actions');

const GiftsForm = require('./gifts_form');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state){
  const forms = state.form.gifts;
  const nf = forms ? forms.new.values : {};
  return { 
    formData: nf,
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts'),
    resetForm: () => { dispatch(reset('gifts[new]')) }
  };
};


class GiftsNewCard extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {edit: false};
  }

  render(){
    const classes = cn('gift-card','new-gift-card',{edit: this.state.edit});
    return (
      <div className={classes} >
        <div className="gift-card-inner">
          <div className="gift-card-front" onClick={this.toggleEdit}>
            <h3><i className="fa fa-gift" /></h3>
            <h4 className="add-label">Add a new gift</h4>
          </div>
          <div className="gift-card-back">
            <GiftsForm onCancel={this.toggleEdit} onSubmit={this.onSubmit} form="gifts[new]"/>
            <button className="btn btn-sm btn-success" onClick={this.onSubmit}>Add</button>
            <button className="btn btn-sm btn-primary" onClick={this.toggleEdit}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  toggleEdit = (e) => {
    this.setState({edit: !this.state.edit});
    this.props.resetForm();
  }

  onSubmit = (e) => {
    GiftsActions.create(this.props.formData).then( gifts => {
      this.props.mergeGifts(gifts);
      this.toggleEdit(e);
    });
  }
}


module.exports = connect(mapStateToProps,mapDispatchToProps)(GiftsNewCard);