const Validator = require('validator')
const isEmpty = require('./emptyCheck')

module.exports = function validateAlbum(data) {
  let errors = {}
  // SET EMPTY THINGS TO EMPTY STRINGS SO VALIDATOR CAN DO ITS THING
  data.title = !isEmpty(data.title) ? data.title : ''
  data.artist = !isEmpty(data.artist) ? data.artist : ''
  data.year = !isEmpty(data.year) ? data.year : ''

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Album title is required'
  }
  if (Validator.isEmpty(data.artist)) {
    errors.artist = 'Artist is required'
  }
  if (!isEmpty(data.year)) {
    if (!Validator.isLength(data.year, { min: 4, max: 4 })) {
      errors.year = 'Year must be 4 characters'
    }
  }
  if (!isEmpty(data.cover)) {
    if (!Validator.isURL(data.cover)) {
      errors.cover = 'Album cover must be an URL'
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
