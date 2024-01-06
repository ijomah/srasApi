const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const genHash = require('./util/passwordFxn');

const db = require("../dbconfig/configDb");
 

passport.use('localSignup', new LocalStrategy({
    usernameField: 'phone',
    passwordField: 'password',
    passReqToCallback: true
},
(req, phone, password, next) => {
    findUserByPhone(phone, (user) => {
        if(user) return next(null, false);
        else {
            //hash password here b4 creating
            let newUser = createUser(phone, password);

            newUser.save(() => next(null, newUser))
        }
    })
}
))


const getUserSignInDetail = (req, res) => {
    console.log(db('scores'))

    res.send('User Signin details, because I am Get');
}

const signIn = (req, res) => {
   const {password, userName, schHeadId, parentageId, teacherId} = req.body;
    const hash = genHash(password)
    try {
        db.transaction(async (tx) => {
            const loginId = await tx('logins').insert({
                hash: hash,
                user_name: userName,
                parentage_id: parentageId,
                teacher_id: teacherId,
                sch_head_id: schHeadId 
            }, 'id')
            return res.status(200).send(loginId[0].id);
        })
    } catch(error) {
        console.log('signin err', error)
    }
}

const updateSignIn = (req, res) => {
    const {id, data} = req.body;
    // db('logins').where({id: id}).update({})
    res.send('I will alter a sign in field, because I am patch');
}

const deleteSignInUser = (req, res) => {
    const {id} = req.body;
    db('logins')
        .where({ id: id })
        .del()
    res.status(200).send('signin is deleted');
}

module.exports = {deleteSignInUser, updateSignIn, getUserSignInDetail, signIn};