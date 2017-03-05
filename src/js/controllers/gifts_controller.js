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

const GiftsController = {
  index: function(req,res){
    const params = strongParams(req.params,queryWhitelist);
    GiftsQueries.where(req.user,params).then( gifts => {
      res.json({gifts: keyBy(gifts,g => g.id)});
    });
  },
  create: function(req,res){
    const params = strongParams(req.body,editWhitelist);
    GiftsQueries.create(req.user,params).then( gifts => {
      res.json({gifts: keyBy(gifts,g => g.id)});
    })
  },
  update: function(req,res){
    const params = strongParams(req.body,editWhitelist);
    GiftsQueries.update(req.user,req.params.id,params).then( gifts => {
      res.json({gifts: keyBy(gifts,g => g.id)});
    })
  }
};

module.exports = GiftsController;