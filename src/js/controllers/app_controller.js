'use strict';

const AppController = {
  index: function(req,res){
    // if(req.isAuthenticated()){

    // } else {
      res.render('landing_pages/index')
    // }
  }
};

module.exports = AppController;