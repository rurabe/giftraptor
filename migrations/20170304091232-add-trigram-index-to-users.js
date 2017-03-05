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
  db.runSql('create index index_name_on_users_trigram ON users USING GIN (name gin_trgm_ops);',callback);
};

exports.down = function(db,callback) {
  db.runSql('drop index index_name_on_users_trigram;',callback);
};

exports._meta = {
  "version": 1
};
