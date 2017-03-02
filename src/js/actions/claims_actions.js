'use strict';
const superagent = require('superagent');
const keyBy = require('lodash/keyBy');

const ClaimsActions = {
  create: function(giftId){
    return new Promise((resolve,reject) => {
      superagent.post(`/api/gifts/${giftId}/claims`).end((err,res) => {
        if(err){ reject(err); }
        resolve(keyBy(res.body.gifts,g => g.id));
      });
    });
  },
  destroy: function(giftId){
    return new Promise((resolve,reject) => {
      superagent.delete(`/api/gifts/${giftId}/unclaims`).end((err,res) => {
        if(err){ reject(err); }
        resolve(keyBy(res.body.gifts,g => g.id));
      });
    });
  }
};

module.exports = ClaimsActions;