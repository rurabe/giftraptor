'use strict';
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const DB = require('../server/db');
const slug = require('slugg');
const returnOne = DB.first;

const UsersErrors = require('../errors/users_errors');

const UsersQueries = {
  create: function(params){
    return bcrypt.hash(params.password,10).then(encrypted_password => {
      return _insertNewUser(params.email,encrypted_password,params.name);
    });
  },
  findBySlug: function(slug){
    return DB.query({
      text: 'select id,email,name,picture,slug from users where slug = $1;',
      values: [slug]
    }).then(returnOne);
  },
  findById: function(id){
    return DB.query({
      text: 'select id,email,name,picture,slug from users where id = $1;',
      values: [id]
    }).then(returnOne);
  },
  authenticate: function(email,password,current_sign_in_ip){
    return DB.query({
      text: 'select * from users where email = $1 and encrypted_password is not null;',
      values: [email]
    }).then(returnOne).then(user => {
      if(!user){
        return Promise.reject(new UsersErrors.NotFound());
      } else {
        return bcrypt.compare(password,user.encrypted_password).then(isAuthorized => {
          if(!isAuthorized){
            return Promise.reject(new UsersErrors.NotFound());
          } else {
            return _updateLoginInfo(user.id,current_sign_in_ip);
          }
        });
      }
    });
  },
  upsert: function(provider,providerId,user,current_sign_in_ip){
    return DB.query({
      text: `
        with slug as (
          select slugs.slug from (
            select ($6|| '-' || i) as slug from generate_series(1,1000) i union values($6)
          ) slugs 
          left join users on slugs.slug = users.slug 
          where users.id is null 
          order by length(slugs.slug),random() limit 1
        )
        insert into users(provider,uid,name,email,picture,slug,current_sign_in_ip,current_sign_in_at,sign_in_count) 
        values ($1,$2,$3,$4,$5,(select slug from slug),$7,now(),1)
        on conflict (provider,uid) do update set 
          name=$3,
          email=$4,
          picture=$5,
          slug=(select (case count(*) when 0 then $6 else ($6||'-'||count(*)+1) end) from users where slug like ($6||'%')),
          sign_in_count = (users.sign_in_count + 1),
          last_sign_in_at = users.current_sign_in_at,
          current_sign_in_at = now(),
          last_sign_in_ip = users.current_sign_in_ip,
          current_sign_in_ip = $7
        where users.provider=$1 and users.uid=$2 returning *;
      `,
      values: [provider,providerId,user.name,user.email,user.picture,slug(user.name),current_sign_in_ip]
    }).then(returnOne)
  },
  update: function(user,params) {
    const p = Object.assign({},params,{id: user.id});
    return _updateProfile(p);
  }
};

const _insertNewUser = function(email,encrypted_password,name){
  return DB.query({
    text: `
      with slug as (
        select slugs.slug from (
          select ($4|| '-' || i) as slug from generate_series(1,1000) i union values($4)
        ) slugs 
        left join users on slugs.slug = users.slug 
        where users.id is null 
        order by length(slugs.slug),random() limit 1
      )
      insert into users(email,encrypted_password,name,slug) 
      values ($1,$2,$3,(select slug from slug)) returning *;`,
    values: [email,encrypted_password,name,slug(name)],
  }).then(returnOne);
};

const _updateLoginInfo = function(id,current_sign_in_ip){
  return DB.query({
    text: `
      update users set
        sign_in_count = (sign_in_count + 1),
        last_sign_in_at = current_sign_in_at,
        current_sign_in_at = now(),
        last_sign_in_ip = current_sign_in_ip,
        current_sign_in_ip = $2
      where id = $1 returning *;`,
    values: [id,current_sign_in_ip],
  }).then(returnOne);
};

const _updateProfile = function(p) {
  return DB.query({
    text:
      `UPDATE USERS set
        first_name = $1,
        last_name = $2,
        email = $3
      WHERE id = $4 RETURNING *;`,
    values: [p.first_name, p.last_name, p.email, p.id]
  }).then(returnOne);
}

module.exports = UsersQueries;