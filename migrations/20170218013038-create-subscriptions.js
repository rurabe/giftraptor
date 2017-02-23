'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  db.createTable('subscriptions',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    provider_id:            {type: 'int', foreignKey: {
                              name: 'subscriptions_provider_id_fk',
                              table: 'users',
                              rules: {onDelete: 'CASCADE'},
                              mapping: {provider_id: 'id'},
                            }},
    subscriber_id:          {type: 'int', foreignKey: {
                              name: 'subscriptions_subscriber_id_fk',
                              table: 'users',
                              rules: {onDelete: 'CASCADE'},
                              mapping: {subscriber_id: 'id'},
                            }},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  },() => {
    db.runSql(`
      create trigger timestamps_on_subscriptions 
      before insert or update on subscriptions 
      for each row execute procedure timestamp_on_change();
    `,() => {
      db.addIndex('subscriptions','index_subscriptions_on_provider_id',['provider_id'],() => {
        db.addIndex('subscriptions','index_subscriptions_on_subscriber_id_and_provider_id',['subscriber_id','provider_id'],true,callback);
      });
    });
  });
};

exports.down = function(db,callback) {
  db.dropTable('subscriptions',callback);
};

exports._meta = {
  "version": 1
};
