const express = require('express');

const {deleteComment, updateComment, getUserCommentDetail, postComment} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserCommentDetail)

    router.post('/', postComment)

    router.put('/:id', updateComment)

    router.delete('/:id', deleteComment)

module.exports = router