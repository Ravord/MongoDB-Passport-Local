const User = require('./models/userSchema.js')

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
passport.use(new localStrategy(async (username, password, done) => {
  let foundUser = await User.findOne({ username: username })
  if (foundUser) {
    let decrypted = await bcrypt.compare(password, foundUser.password)
    if (decrypted) {
      done(null, foundUser)
    }
    else {
      done(null, false)
    }
  }
  else {
    done(null, false)
  }
}))
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (userID, done) => {
  try {
    let foundUser = await User.findById(userID)
    done(null, foundUser)
  }
  catch (err) {
    done(err, false)
  }
})
module.exports = passport
