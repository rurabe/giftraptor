'use strict';
const superagent = require('superagent');

const PeopleActions = {
  show: function(slug){
    return new Promise((resolve,reject) => {
      superagent.get(`/api/people/${slug}`).end((err,res) => {
        if(err){ reject(err); }
        resolve(res.body);
      });
    });
  },
};

module.exports = PeopleActions;