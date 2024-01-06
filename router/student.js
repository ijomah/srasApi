const express = require('express');

const {deleteStudent, updateStudent, getStudentDetail, postStudent} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getStudentDetail)

    router.post('/', postStudent)

    router.put('/:id', updateStudent)

    router.delete('/:id', deleteStudent)

module.exports = router