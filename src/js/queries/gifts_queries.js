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
  }
};

module.exports = GiftsQueries;