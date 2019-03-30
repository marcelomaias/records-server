const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/config')
const passport = require('passport')

// MODELS
const User = require('../models/userModel')

// VALIDATION
const validateRegister = require('../validation/registerValidation')
const validateLogin = require('../validation/loginValidation')

// GET USERS
router.get('/', (req, res) => res.json({ msg: 'User works' }))

// REGISTER USER
router.post('/', (req, res) => {
  // VALIDATE
  const { errors, isValid } = validateRegister(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'User already exists.'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })
    }
  })
})

// USER LOGIN
router.post('/login', (req, res) => {
  // VALIDATE
  const { errors, isValid } = validateLogin(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found.'
      return res.status(400).json(errors)
    }
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        // PAYLOAD TO SEND IN THE TOKEN
        const payload = { id: user.id, name: user.name }
        // GENERATE THE TOKEN
        jwt.sign(payload, keys.jwt_secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: 'Looks good',
            token: 'Bearer ' + token
          })
        })
      } else {
        errors.password = 'Incorrect password.'
        return res.status(400).json(errors)
      }
    })
  })
})

// CURRENT USER
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router
