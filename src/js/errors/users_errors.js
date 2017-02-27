'use strict';
const { createError } = require('../helpers/errors_helpers');

const UsersErrors = {
  NotFound: createError('UserNotFoundError',() => 'Email and/or password was incorrect'),
  EmailAlreadyExists: createError('UserEmailAlreadyExistsError', () => 'An account with this email already exists')
};

module.exports = UsersErrors;