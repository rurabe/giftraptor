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
  db.createTable('users',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    email:                  {type: 'text', notNull: true},
    encrypted_password:     {type: 'text', notNull: true},
    reset_password_token:   {type: 'text'},
    reset_password_sent_at: {type: 'timestamp'},
    remember_created_at:    {type: 'timestamp'},
    sign_in_count:          {type: 'int', defaultValue: 0},
    current_sign_in_at:     {type: 'timestamp'},
    last_sign_in_at:        {type: 'timestamp'},
    current_sign_in_ip:     {type: 'inet'},
    last_sign_in_ip:        {type: 'inet'},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'},
    name:                   {type: 'text'},
    picture:                {type: 'text'},
    provider:               {type: 'text'},
    uid:                    {type: 'text'},
    slug:                   {type: 'text'},
  },() => {
    db.runSql(`
      create trigger timestamps_on_users 
      before insert or update on users 
      for each row execute procedure timestamp_on_change();
    `,() => {
      db.addIndex('users','index_users_on_email',['email'],true,() => {
        db.addIndex('users','index_users_on_reset_password_token',['reset_password_token'],true,() => {
          db.addIndex('users','index_users_on_slug',['slug'],true,() => {
            db.runSql('create index index_users_on_provider_information on users(provider,uid) where ((provider is not null) and (uid is not null));',callback);
          });
        });
      });
    });
  });
};

exports.down = function(db,callback) {
  db.dropTable('users',callback);
};

exports._meta = {
  "version": 1
};
