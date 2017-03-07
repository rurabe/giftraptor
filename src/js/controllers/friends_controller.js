'use strict';
const PeopleQueries = require('../queries/people_queries');
const SubscriptionsQueries = require('../queries/subscriptions_queries');
const keyBy = require('lodash/keyBy');

const FriendsController = {
  index: function(req,res){
    PeopleQueries.where(req.user,{},{'user_subscriptions.id': null}).then(friends => {
      res.json({people: keyBy(friends,f => f.slug)});
    });
  },
  create: function(req,res){
    SubscriptionsQueries.create(req.user,req.params.slug).then(friends => {
      res.json({people: keyBy(friends,f => f.slug)});
    });
  },
  destroy: function(req,res){
    SubscriptionsQueries.destroy(req.user,req.params.slug).then(friends => {
      res.json({people: keyBy(friends,f => f.slug)});
    });
  }
};

module.exports = FriendsController;