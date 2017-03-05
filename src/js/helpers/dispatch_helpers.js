'use strict';

const DispatchHelpers = {
  dispatchMerge: function(dispatch,resourceName){
    return function(data){
      let action = {type: `${resourceName}.merge`};
      action[resourceName] = data[resourceName];
      dispatch(action);
    };
  }
};

module.exports = DispatchHelpers;