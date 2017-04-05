'use strict';
const { parse } = require('url');


const formatLink = function(url){
  if(url && !/^(?:f|ht)tps?\:\/\//.test(url)) {
    return "http://" + url;
  } else {
    return url;
  }
};

const addParam = function(parsedUrl,paramsToAdd){
  for(var key in paramsToAdd){
    parsedUrl.query[key] = paramsToAdd[key];
  }
  parsedUrl.search = null;
  parsedUrl.protocol = parsedUrl.protocol || 'http:'
  return parsedUrl.format();
}

const referify = function(url){
  if(!url){ return undefined; }
  let u = parse(formatLink(url),true);
  switch(true){
  case (/\bamazon\.com\b/i).test(u.host):
    return addParam(u,{tag: 'giftraptor-20'});
  default:
    return url;
  }
}

const LinkHelpers = {
  formatLink: formatLink,
  referify: referify
};

module.exports = LinkHelpers;