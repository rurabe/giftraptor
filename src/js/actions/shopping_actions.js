'use strict';
const { request } = require('../helpers/actions_helpers');

const ShoppingActions = {
  index: function(params){
    return request(r => r.get('/api/shopping').query(params) );
  },
};

module.exports = ShoppingActions;