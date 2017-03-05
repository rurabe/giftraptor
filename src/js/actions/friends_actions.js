'use strict';
const { request } = require('../helpers/actions_helpers');

const FriendsActions = {
  index: function(){
    return request(r => r.get(`/api/friends`) );
  },
};

module.exports = FriendsActions;