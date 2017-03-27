'use strict';
const DB = require('../server/db');
const Squel = require('squel').useFlavour('postgres');

const { filter } = require('../helpers/query_helpers');

const FeedQueries = {
  for: function(user,params){
    const q = Squel.select().from('gifts').field('id,name,description,link,image,user_id')
      .where('user_id = ?',user.id);
    const fq = filter(q,params);
    return DB.query(fq.toParam());
  },
};

module.exports = FeedQueries; 