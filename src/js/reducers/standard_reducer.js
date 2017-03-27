'use strict';
const Immutable = require('immutable');

const StandardReducer = function(key){
  return function(state=Immutable.Map(),action){
    switch(action.type){
    case `${key}.merge`:
      return state.mergeDeep(action[key]);
    case `${key}.remove` : 
      // loop through action.paths and remove those keys
      return state;
    default:
      return state;
    }
  };
}


module.exports = StandardReducer;