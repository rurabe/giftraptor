'use strict';
const superagent = require('superagent');
const keyBy = require('lodash/keyBy');

const GiftsActions = {
  index: function(params){
    return new Promise((resolve,reject) => {
      superagent.get('/api/gifts').query(params).end((err,res) => {
        if(err){ reject(err); }
        resolve(keyBy(res.body.gifts,g => g.id));
      });
    });
  },
  create: function(params){
    return new Promise((resolve,reject) => {
      superagent.post('/api/gifts').send(params).end((err,res) => {
        if(err){ reject(err); }
        resolve(keyBy(res.body.gifts,g => g.id));
      })
    })
  },
  update: function(giftId,params){
    return new Promise((resolve,reject) => {
      superagent.put(`/api/gifts/${giftId}`).send(params).end((err,res) => {
        if(err){ reject(err); }
        resolve(keyBy(res.body.gifts,g => g.id));
      })
    })
  }
};

module.exports = GiftsActions;