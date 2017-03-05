'use strict';
const { request } = require('../helpers/actions_helpers');

const ClaimsActions = {
  create: function(giftId){
    return request(r => r.post(`/api/gifts/${giftId}/claims`) );
  },
  destroy: function(giftId){
    return request(r => r.delete(`/api/gifts/${giftId}/unclaims`) );
  }
};

module.exports = ClaimsActions;