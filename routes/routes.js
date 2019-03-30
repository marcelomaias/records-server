const userRouter = require('./userRoutes')
const albumRouter = require('./albumRoutes')

module.exports = function(app) {
  app.use('/api/users', userRouter)
  app.use('/api/albums', albumRouter)
}
