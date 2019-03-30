const mongoose = require('mongoose')

const Schema = mongoose.Schema

const albumSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String
  },
  artist: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  cover: {
    type: String
  },
  songs: {
    type: [String]
  }
})

module.exports = mongoose.model('Album', albumSchema)
