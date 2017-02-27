'use strict';
const reduce = require('lodash/reduce');
const has = require('lodash/has');

const ParamsHelpers = {
  strongParams: function(params,whitelist){
    return reduce(whitelist,(p,required,key) => {
      if( has(params,key) ){
        p[key] = params[key];
      } else if(required){
        p[key] = null;
      }
      return p;
    },{});
  }
};

module.exports = ParamsHelpers;