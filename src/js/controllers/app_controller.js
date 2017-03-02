'use strict';
const UsersQueries = require('../queries/users_queries');

const AppController = {
  index: function(req,res){
    if(req.isAuthenticated()){
      UsersQueries.findById(req.user.id).then(user => {
        res.render('app/index',{initialState: {user: user}});
      });
    } else {
      res.render('landing_pages/index');
    }
  }
};

module.exports = AppController;