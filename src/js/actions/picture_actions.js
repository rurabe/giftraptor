'use strict';
const superagent = require('superagent');

const PictureHelpers = {
  fetch: function(url){
    console.log()
    superagent.get('http://google.com').end((err,res) => {
      console.log(err,res)
    })
  }
};

module.exports = PictureHelpers;