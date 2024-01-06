const express = require('express');

const {deleteResult, updateResult, getUserResultDetail, postResult} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserResultDetail)

    router.post('/', postResult)

    router.put('/:id', updateResult)

    router.delete('/:id', deleteResult)

module.exports = router