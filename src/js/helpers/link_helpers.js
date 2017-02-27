'use strict';

const addProtocol = function(url){
  if(url && !/^(?:f|ht)tps?\:\/\//.test(url)) {
    return "http://" + url;
  } else {
    return url;
  }
}

const LinkHelpers = {
  formatLink: function(url){
    const protocolUrl = addProtocol(url);
    return protocolUrl;
  }
};

module.exports = LinkHelpers;