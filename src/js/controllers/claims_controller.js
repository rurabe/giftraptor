'use strict';
const ClaimsQueries = require('../queries/claims_queries');
const keyBy = require('lodash/keyBy');


const ClaimsController = {
  create: function(req,res){
    ClaimsQueries.create(req.user,req.params.id).then(gifts => {
      res.json({gifts: keyBy(gifts,g => g.id)});
    });
  },
  destroy: function(req,res){
    ClaimsQueries.destroy(req.user,req.params.id).then(gifts => {
      res.json({gifts: keyBy(gifts,g => g.id)});
    });    
  }
};

module.exports = ClaimsController;