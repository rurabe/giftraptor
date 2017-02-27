'use strict';

const ErrorsHelpers = {
  createError: function(name,messageCreator){
    let newError = function(...args){ this.message = messageCreator(...args); this.stack = Error().stack; };
    newError.prototype = Object.create(Error.prototype);
    newError.prototype.name = name;
    return newError;
  }
};

module.exports = ErrorsHelpers;