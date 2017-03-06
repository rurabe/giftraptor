'use strict';
const { request } = require('../helpers/actions_helpers');

const FriendsActions = {
  index: function(){
    return request(r => r.get(`/api/friends`) );
  },
  create: function(slug){
    return request(r => r.post(`/api/friends/${slug}`) );
  },
  destroy: function(slug){
    return request(r => r.delete(`/api/friends/${slug}`) );
  }
};

module.exports = FriendsActions;