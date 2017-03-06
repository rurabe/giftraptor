'use strict';
const DB = require('../server/db');
const Squel = require('squel').useFlavour('postgres');

const { filter } = require('../helpers/query_helpers');

const SubscriptionsQueries = {
  create: function(user,providerSlug){
    return DB.query({
      text: `
        with provider as (
          select * from users where slug = $2
        )
        insert into subscriptions(subscriber_id,provider_id) values ($1,(select id from provider))
        on conflict(subscriber_id,provider_id) do nothing;
      `,
      values: [user.id,providerSlug]
    }).then(rows => [{slug: providerSlug, is_friend: true}]);
  },
  destroy: function(user,providerSlug){
    return DB.query({
      text: `
        with provider as (
          select * from users where slug = $2
        )
        delete from subscriptions where subscriber_id = $1 and provider_id = (select id from provider);
      `,
      values: [user.id,providerSlug]
    }).then(rows => [{slug: providerSlug, is_friend: false}]);
  }
};

module.exports = SubscriptionsQueries;