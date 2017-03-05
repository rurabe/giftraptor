'use strict';
const PeopleQueries = require('../queries/people_queries');
const keyBy = require('lodash/keyBy');

const FriendsController = {
  index: function(req,res){
    PeopleQueries.where(req.user,{},{'user_subscriptions.id': null}).then(friends => {
      res.json(keyBy(friends,f => f.id));
    })
  }
};

module.exports = FriendsController;