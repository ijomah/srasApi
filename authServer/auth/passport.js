const passport = require('passport');
const db = require('../../dbconfig/configDb');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db('logins').where({id}).first()
        .then((user) => { done(null, user);})
        .catch((err) => { done(err, null);});
    });
};