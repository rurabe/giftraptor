'use strict';

const QueryHelpers = {
  filter: function(query,filters,not){
    filters = filters || {}; not = not || {};
    for(var col in filters){
      let filter = filters[col];
      if(filter){
        let op = (Array.isArray(filter) ? 'IN' : '=');
        query.where(`${col} ${op} ?`,filter);
      } else {
        query.where(`${col} IS NULL`);
      }
    }
    for(var col in not){
      let filter = not[col];
      if(filter){
        let op = (Array.isArray(filter) ? 'NOT IN' : '!=');
        query.where(`${col} ${op} ?`,filter);
      } else {
        query.where(`${col} IS NOT NULL`);
      }
    }
    return query;
  }
};

module.exports = QueryHelpers;