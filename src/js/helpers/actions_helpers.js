'use strict';
const superagent = require('superagent');

const ActionsHelpers = {
  request: function(reqFn){
    return new Promise((resolve,reject) => {
      reqFn(superagent).end((err,res) => {
        err ? reject(err) : resolve(res.body);
      });
    });
  }
};

module.exports = ActionsHelpers;