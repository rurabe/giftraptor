'use strict';

const DispatchHelpers = {
  dispatchMerge: function(dispatch,resourceName){
    return function(keyedResourceCollection){
      let action = {type: `${resourceName}.merge`};
      action[resourceName] = keyedResourceCollection;
      dispatch(action);
    };
  }
};

module.exports = DispatchHelpers;