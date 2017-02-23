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
  db.runSql(`
    create or replace function timestamp_on_change() returns trigger as $$
      begin 
        new.created_at = coalesce(new.created_at,now());
        new.updated_at = now();
        return new;
      end 
    $$ language plpgsql;
  `,callback);
};

exports.down = function(db) {
  db.runSql('drop function if exists timestamp_on_change();',callback);
};

exports._meta = {
  "version": 1
};
