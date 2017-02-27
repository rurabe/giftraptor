'use strict';
const React = require('react');
const cn = require('classnames');
const { connect } = require('react-redux');
const { Field,reduxForm } = require('redux-form');

const mapStateToProps = function(state,ownProps){
  const g = ownProps.gift;
  return {
    initialValues: (g ? g.toJSON() : {}),
  };
};

class GiftsForm extends React.PureComponent {

  render(){
    const commit = (this.props.gift ? 'Update' : 'Add');
    return (
      <form className="gift-form" onSubmit={this.onSubmit}>
        <div className="form-group">
          <Field name="name" className="form-control" type="text" component="input" placeholder="Name" />
        </div>
        <div className="form-group">
          <Field name="description" className="form-control" type="text" component="textarea" placeholder="Description" />
        </div>
        <div className="form-group">
          <Field name="link" className="form-control" type="text" component="input" placeholder="Link (optional)" />
        </div>
        <div className="form-group">
          <Field name="image" className="form-control" type="text" component="input" placeholder="Image URL (optional)" />
        </div>
      </form>
    );
  }

  onSubmit = (e) => { e.preventDefault(); if(this.props.onSubmit){ this.props.onSubmit(e) } }
}

GiftsForm.PropTypes = {
  form: React.PropTypes.string.isRequired,
}

const formOptions = {enableReinitialize: true};

module.exports = connect(mapStateToProps)(reduxForm(formOptions)(GiftsForm));