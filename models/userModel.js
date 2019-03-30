const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('User', userSchema)
