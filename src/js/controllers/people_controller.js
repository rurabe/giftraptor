'use strict';
const PeopleQueries = require('../queries/people_queries');

const PeopleController = {
  show: function(req,res){
    PeopleQueries.withGifts(req.user,{slug: [req.params.slug]}).then(data => {
      res.json(data[0]);
    })
  }
};

module.exports = PeopleController;