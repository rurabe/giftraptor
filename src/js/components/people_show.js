'use strict';
const React = require('react');
const { connect } = require('react-redux');

const GiftsActions = require('../actions/gifts_actions');
const PeopleActions = require('../actions/people_actions');

const GiftsGrid = require('./gifts_grid');
const Loading = require('./loading');

const { dispatchMerge } = require('../helpers/dispatch_helpers');

const mapStateToProps = function(state,ownProps){
  return {
    person: state.people.get(ownProps.params.slug),
    gifts: state.gifts.filter(g => g.get('user_slug') === ownProps.params.slug),
  };
};

const mapDispatchToProps = function(dispatch){
  return {
    mergeGifts: dispatchMerge(dispatch,'gifts'),
    mergePeople: dispatchMerge(dispatch,'people'),
  };
};

class PeopleShow extends React.PureComponent {

  componentDidMount = () => this.getData();
  componentDidUpdate = () => this.getData();

  getData = () => {
    PeopleActions.show(this.props.params.slug).then(data => {
      this.props.mergeGifts(data);
      this.props.mergePeople(data);
    });
  }

  render(){
    if(this.props.person){
      return (
        <div id="usersShow">
          <div className="page-header">
            <h1>{this.props.person.get('name')}'s wishlist</h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <GiftsGrid gifts={this.props.gifts} edit={false}/>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />
    }

  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(PeopleShow);