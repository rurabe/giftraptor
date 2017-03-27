'use strict';
const DB = require('../server/db');
const Squel = require('squel').useFlavour('postgres');

const { filter } = require('../helpers/query_helpers');

const ClaimsQueries = {
  create: function(user,giftId){
    return DB.query({
      text: `
        update gifts set gifter_id = gifters.id 
        from users as gifters 
        where gifters.id = $1 and gifts.id = $2 and gifts.deleted_at is null
        returning gifts.id, gifters.slug as gifter_slug, gifters.name as gifter_name;
      `,
      values: [user.id,giftId],
    });
  },
  destroy: function(user,giftId){
    return DB.query({
      text: `
        update gifts set gifter_id = null
        from users as gifters 
        where gifters.id = $1 and gifts.id = $2 and gifts.gifter_id = gifters.id and gifts.deleted_at is null
        returning gifts.id, null as gifter_slug, null as gifter_name;
      `,
      values: [user.id,giftId],
    });
  }
};

module.exports = ClaimsQueries;