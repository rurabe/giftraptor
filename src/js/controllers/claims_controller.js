'use strict';
const ClaimsQueries = require('../queries/claims_queries');


const ClaimsController = {
  create: function(req,res){
    ClaimsQueries.create(req.user,req.params.id).then(gifts => {
      res.json({gifts: gifts});
    });
  },
  destroy: function(req,res){
    ClaimsQueries.destroy(req.user,req.params.id).then(gifts => {
      res.json({gifts: gifts});
    });    
  }
};

module.exports = ClaimsController;