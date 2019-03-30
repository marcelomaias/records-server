const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

require('dotenv').config()
const config = require('./config/config')

const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
app.use(cors())

const uri = config.mongoURI
const opts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}

mongoose
  .connect(uri, opts)
  .then(() => console.log('Looking sharp... DB connected...'))
  .catch(err => console.error('Could not connect to MongoDB.', err))

require('./routes/routes')(app)

// PASSPORT SETUP
app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(port, () => console.log(`All good, running on port ${port}.`))
