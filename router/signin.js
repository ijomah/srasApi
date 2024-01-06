const express = require('express');

const {signIn, updateSignIn, deleteSignInUser, getUserSignInDetail} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserSignInDetail)

    router.post('/', signIn)

    router.patch('/:id', updateSignIn)

    router.delete('/:id', deleteSignInUser)

module.exports = router