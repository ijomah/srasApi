const express = require('express');
const authHelper = require('./../authServer/auth/helperFxns');

const {signIn, updateSignIn, deleteSignInUser, getUserSignInDetail} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserSignInDetail)

    router.post('/', authHelper.loginRedirect, signIn)

    router.patch('/:id', updateSignIn)

    router.delete('/:id', deleteSignInUser)

module.exports = router