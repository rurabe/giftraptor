'use strict';
const keyBy = require('lodash/keyBy');
const GiftsQueries = require('../queries/gifts_queries');

const { strongParams } = require('../helpers/params_helpers');

const queryWhitelist = {
  id: false,
  gifter_id: false,
}

const editWhitelist = {
  name: false,
  description: false,
  link: false,
  image: false,
}

const respond = function(res){
  return function(gifts){
    res.json({gifts: keyBy(gifts,g => g.id)});
  }
}

const GiftsController = {
  index: function(req,res){
    const params = strongParams(req.params,queryWhitelist);
    GiftsQueries.shopping(req.user,params).then(respond(res));
  },
};

module.exports = GiftsController;