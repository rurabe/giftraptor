'use strict';

const SessionsController = {
  new: function(req,res){
    res.render('sessions/new');
  }
};

module.exports = SessionsController;