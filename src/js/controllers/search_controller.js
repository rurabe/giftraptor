'use strict';
const PeopleQueries = require('../queries/people_queries');

const PeopleSearchController = {
  index: function(req,res){
    PeopleQueries.search(req.user,req.query.s).then(search => {
      res.json({search: search});
    });
  },
};

module.exports = PeopleSearchController;