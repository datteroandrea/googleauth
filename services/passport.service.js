var GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require('passport');
const users = require("../models/user.model");

passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(userId, done) {
  users.findById(userId, function(err, user) {
    done(err, user);
  });
});

var strategy = new GoogleStrategy(
  {
    clientID: '598928624833-3c4n5k2sip601mp8u4ipc00dh6f9to49.apps.googleusercontent.com',
    clientSecret: '_1aYiLswy1NtGlmNO4Z9vIcs',
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    console.log('Authentication!');
    users.findOrCreate(profile,(user)=>{
      return done(null, user);
    });
  }
);

module.exports = strategy;
