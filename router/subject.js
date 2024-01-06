const express = require('express');

const {deleteSubject, updateSubject, getUserSubjectDetail, postSubject} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserSubjectDetail)

    router.post('/', postSubject)

    router.put('/:id', updateSubject)

    router.delete('/:id', deleteSubject)

module.exports = router