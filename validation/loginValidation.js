const Validator = require('validator')
const isEmpty = require('./emptyCheck')

module.exports = function validateLogin(data) {
  let errors = {}
  // SET EMPTY THINGS TO EMPTY STRINGS SO VALIDATOR CAN DO ITS THING
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
