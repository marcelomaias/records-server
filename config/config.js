module.exports = {
  mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@events-rgy7s.mongodb.net/${
    process.env.MONGO_DB
  }?retryWrites=true`,
  jwt_secret: '${process.env.JWT_SECRET}'
}
