var GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../config.json');
const passport = require('passport');
const users = require("../models/user.model");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  users.findById(user.userId, function(err, user) {
    done(err, user);
  });
});

var strategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: 'http://localhost:3001/auth/google/callback',
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    users.findOrCreate(profile,(user)=>{
      return done(null, user);
    });
  }
);

module.exports = strategy;
