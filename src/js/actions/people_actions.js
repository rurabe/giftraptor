'use strict';
const { request } = require('../helpers/actions_helpers');

const PeopleActions = {
  show: function(slug){
    return request(r => r.get(`/api/people/${slug}`) );
  },
};

module.exports = PeopleActions;