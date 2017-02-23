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
  db.createTable('gifts',{
    id:                     {type: 'int', primaryKey: true, autoIncrement: true, notNull: true},
    name:                   {type: 'text'},
    description:            {type: 'text'},
    link:                   {type: 'text'},
    image:                  {type: 'text'},
    user_id:                {type: 'int', foreignKey: {
                              name: 'gifts_user_id_fk',
                              table: 'users',
                              rules: {onDelete: 'CASCADE'},
                              mapping: {user_id: 'id'},
                            }},
    gifter_id:              {type: 'int', foreignKey: {
                              name: 'gifts_gifter_id_fk',
                              table: 'users',
                              rules: {onDelete: 'CASCADE'},
                              mapping: {gifter_id: 'id'},
                            }},
    created_at:             {type: 'timestamp'},
    updated_at:             {type: 'timestamp'}
  },() => {
    db.runSql(`
      create trigger timestamps_on_gifts 
      before insert or update on gifts 
      for each row execute procedure timestamp_on_change();
    `,() => {
      db.addIndex('gifts','index_gifts_on_user_id',['user_id'],() => {
        db.addIndex('gifts','index_gifts_on_gifter_id',['gifter_id'],callback);
      });
    });
  });
};

exports.down = function(db,callback) {
  db.dropTable('gifts',callback);
};

exports._meta = {
  "version": 1
};
