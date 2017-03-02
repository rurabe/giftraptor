'use strict';
const UsersQueries = require('../queries/users_queries');

const { strongParams } = require('../helpers/params_helpers');

const whitelist = {
  email: false,
  name: false,
  password: false
}

const UsersController = {
  create: function(req,res){
    const params = strongParams(req.body,whitelist);
    UsersQueries.create(params).then(user => {
      req.login(user,err => {
        res.redirect('/')
      });
    });
  },
  show: function(req,res){
    UsersQueries.withGifts(req.user,[req.params.slug]).then(data => {
      res.json(data[0]);
    })
  }
};

module.exports = UsersController;