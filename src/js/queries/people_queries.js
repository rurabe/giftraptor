'use strict';
const Promise = require('bluebird');
const DB = require('../server/db');
const Squel = require('squel').useFlavour('postgres');
const returnOne = DB.first;
const { filter } = require('../helpers/query_helpers');

const PeopleQueries = {
  where: function(user,params,not){
    return DB.query(selectedUsers(user,params,not).toParam());
  },
  search: function(user,searchTerm){
    return DB.query(search(user,searchTerm).toParam());
  },
  withGifts: function(user,params,not){
    const su = selectedUsers(user,params,not);
    const sg = giftsFromUsers(user);
    return DB.query(peopleAndGifts(su,sg).toParam());
  },
};

const selectedUsers = function(user,params,not){
  const q = Squel.select().from('users').field('users.id,slug,name,email,picture')
    .field('(user_subscriptions.id IS NOT NULL) as is_friend')
    .left_join(
      Squel.select().field('*').from('subscriptions').where('subscriber_id = ?',user.id),
      'user_subscriptions',
      'user_subscriptions.provider_id = users.id'
    )
    .where('users.id != ?',user.id);
  return filter(q,params,not);
};

const search = function(user,searchTerm){
  const ilike = `%${searchTerm}%`;
  return selectedUsers(user,{},{})
    .where('name % ? OR name ILIKE ?',searchTerm,ilike)   
    .order('similarity(name,?)',false,searchTerm);
};


const giftsFromUsers = function(user){
  return Squel.select().from('gifts').left_join('users','gifters','gifters.id = gifts.gifter_id')
    .field('gifts.id,gifts.name,gifts.description,gifts.link,gifts.image')
    .field('selected_users.slug as user_slug')
    .field('gifters.slug as gifter_slug')
    .field('gifters.name as gifter_name')
    .join('selected_users',null,'selected_users.id = gifts.user_id')
    .where('gifts.deleted_at is null');
};

const peopleAndGifts = function(userQuery,giftsQuery){
  return Squel.select()
    .with('selected_users',userQuery)
    .with('selected_gifts',giftsQuery)
    .field('(select json_object_agg(selected_users.slug,selected_users) from selected_users)','people')
    .field('(select json_object_agg(selected_gifts.id,selected_gifts) from selected_gifts)','gifts')
};

module.exports = PeopleQueries;