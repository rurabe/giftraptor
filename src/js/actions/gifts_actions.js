'use strict';
const { request } = require('../helpers/actions_helpers');

const GiftsActions = {
  index: function(params){
    return request(r => r.get('/api/gifts').query(params) );
  },
  create: function(params){
    return request(r => r.post('/api/gifts').send(params) );
  },
  update: function(giftId,params){
    return request(r => r.put(`/api/gifts/${giftId}`).send(params) );
  }
};

module.exports = GiftsActions;