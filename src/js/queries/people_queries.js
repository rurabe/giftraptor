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
    console.log(search(user,searchTerm).toParam())
    return DB.query(search(user,searchTerm).toParam());
  },
  withGifts: function(user,params,not){
    return DB.query(withGifts(selectedUsers(user,params,not)));
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

const withGifts = function(userQuery){
  return {
    text: `
      with selected_users as (
        ${userQuery.toParam().text}
      ),
      selected_gifts as (
        select 
          gifts.id,gifts.name,gifts.description,gifts.link,gifts.image,
          selected_users.slug as user_slug,
          users.slug as gifter_slug,
          users.name as gifter_name
        from gifts 
        inner join selected_users on selected_users.id = gifts.user_id
        left join users on users.id = gifts.gifter_id 
      )
      select 
        (select json_object_agg(selected_users.slug,selected_users) from selected_users) as people,
        (select json_object_agg(selected_gifts.id,selected_gifts) from selected_gifts) as gifts;
    `,
    values: userQuery.toParam().values,
  };
}

module.exports = PeopleQueries;