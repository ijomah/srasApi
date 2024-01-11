const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const db = require('../../dbconfig/configDb');
const authHelpers = require('./helperFxns');

const options = {};

init();

//logging in purpose
passport.use(new LocalStrategy(options, (phoneNo, password, done) => {
    // check to see if the username/phone number exists
    db('logins').where({ phoneNo }).first()
    .then((user) => {
      if (!user) return done(null, false);
      if (!authHelpers.comparePass(password, user.hash)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    .catch((err) => { return done(err); });
  }));
  
  module.exports = passport;