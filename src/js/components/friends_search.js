'use strict';
const React = require('react');
const { AsyncTypeahead } = require('react-bootstrap-typeahead');
const { browserHistory } = require('react-router');

const SearchActions = require('../actions/search_actions');

class FriendsSearch extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = { searchResults: [] };
  }

  render(){
    return (
      <AsyncTypeahead 
        onSearch={this.onSearch} 
        onChange={this.onChange} 
        options={this.state.searchResults} 
        labelKey={'name'}
        filterBy={(o) => true}
      />
    );
  }

  onSearch = (searchTerm) => {
    SearchActions.index(searchTerm).then(data => {
      this.setState({searchResults: data.search})
    });
  }

  onChange = (selected) => {
    const r = selected[0];
    if(r){ browserHistory.push(`/users/${r.slug}`); }

  }
}

module.exports = FriendsSearch;