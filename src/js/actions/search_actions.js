'use strict';
const { request } = require('../helpers/actions_helpers');

const SearchActions = {
  index: function(searchTerm){
    return request(r => r.get(`/api/search`).query({s: searchTerm}) );
  },
};

module.exports = SearchActions;