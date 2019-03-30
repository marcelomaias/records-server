const express = require('express')
const passport = require('passport')

const router = express.Router()

// MODELS
const Album = require('../models/albumModel')
// VALIDATION
const validateAlbum = require('../validation/albumValidation')

// GET ALL ALBUMS
router.get('/', (req, res) => {
  Album.find()
    .sort({ year: -1 })
    .then(albums => res.json(albums))
    .catch(err => res.status(404).json({ noalbums: 'Albums not found.' }))
})

// GET SINGLE ALBUM
router.get('/:id', (req, res) => {
  Album.findById(req.params.id)
    .then(album => res.json(album))
    .catch(err => res.status(404).json({ noalbum: 'Album not found.' }))
})

// CREATE ALBUM
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // VALIDATE
  const { errors, isValid } = validateAlbum(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const newAlbum = new Album({
    title: req.body.title,
    year: req.body.year,
    artist: req.body.artist,
    description: req.body.description,
    cover: req.body.cover
  })
  newAlbum.save().then(album => res.json(album))
})

// EDIT ALBUM
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  // VALIDATE
  const { errors, isValid } = validateAlbum(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Album.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      year: req.body.year,
      artist: req.body.artist,
      description: req.body.description,
      cover: req.body.cover
    },
    { new: true }
  )
    .then(album => res.json(album))
    .catch(err => res.status(404).json({ noalbum: 'Album not found.' }))
})

// DELETE ALBUM
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Album.findById(req.params.id).then(album => {
    album
      .remove()
      .then(() => res.json({ deleted: true }))
      .catch(err => res.status(404).json({ noalbum: 'Album not found.' }))
  })
})

module.exports = router
