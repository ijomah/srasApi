const passport = require('./../authServer/auth/localize');
// const LocalStrategy = require('passport-local').Strategy;

const genHash = require('./util/passwordFxn');

const db = require("../dbconfig/configDb");
 


const getUserSignInDetail = (req, res) => {
    console.log(db('scores'))

    res.send('User Signin details, because I am Get');
}

const signIn = (req, res, next) => {
    //    const {
    //         password, 
    //         userName, schHeadId, parentageId, teacherId
    //     } = req.body;
    // const hash = genHash(password)
    
    passport.authenticate('local', (err, user, info) => {
            if (err) { handleResponse(res, 500, 'error'); }
            if (!user) { handleResponse(res, 404, 'User not found'); }
            if (user) {
              req.logIn(user, function (err) {
                if (err) { handleResponse(res, 500, 'error'); }
                handleResponse(res, 200, 'success');
              });
            }
    })(req, res, next);    

    //former
        // db.transaction(async (tx) => {
        //     const loginId = await tx('logins').insert({
        //         hash: hash,
        //         user_name: userName,
        //         parentage_id: parentageId,
        //         teacher_id: teacherId,
        //         sch_head_id: schHeadId 
        //     }, 'id')
        //     return res.status(200).send(loginId[0].id);
        // })
    
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

function handleResponse(res, code, statusMsg) {
    res.status(code).json({status: statusMsg});
  }

module.exports = {deleteSignInUser, updateSignIn, getUserSignInDetail, signIn};