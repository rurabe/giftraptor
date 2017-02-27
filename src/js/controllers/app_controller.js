'use strict';

const AppController = {
  index: function(req,res){
    if(req.isAuthenticated()){
      res.render('app/index',{initialState: {user: req.user}});
    } else {
      res.render('landing_pages/index');
    }
  }
};

module.exports = AppController;