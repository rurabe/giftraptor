'use strict';
const DB = require('../server/db');
const Squel = require('squel').useFlavour('postgres');

const { filter } = require('../helpers/query_helpers');

const GiftsQueries = {
  where: function(user,params,notParams){
    const q = Squel.select().from('gifts').field('id,name,description,link,image,user_id')
      .where('user_id = ? and deleted_at is null',user.id);
    const fq = filter(q,params);
    return DB.query(fq.toParam());
  },
  create: function(user,params){
    const q = Squel.insert().into('gifts').setFields(params).set('user_id',user.id)
      .returning('id,name,description,link,image,user_id');
    return DB.query(q.toParam());
  },
  update: function(user,giftId,params){
    const q = Squel.update().table('gifts').setFields(params)
      .where('id = ?',giftId)
      .where('user_id = ? and deleted_at is null',user.id)
      .returning('id,name,description,link,image,user_id');
    return DB.query(q.toParam());
  },
  destroy: function(user,id){
    return DB.query({
      text: `
        update gifts set deleted_at=now() where user_id = $1 and id = $2 returning id,deleted_at;
      `,
      values: [user.id,id]
    })
  },
  shopping: function(user,params){
    const q = Squel.select().from('gifts')
      .field('gifts.id,gifts.name,gifts.description,gifts.link,gifts.image')
      .field('gifters.slug as gifter_slug')
      .field('gifters.name as gifter_name')
      .field('users.slug as user_slug')
      .field('users.name as user_name')
      .left_join('users','gifters','gifters.id = gifts.gifter_id')
      .join('users',null,'users.id = gifts.user_id')
      .where('gifters.id = ? and deleted_at is null',user.id);
    const fq = filter(q,params);
    return DB.query(fq.toParam());
  },
};

module.exports = GiftsQueries;