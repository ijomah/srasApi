const express = require('express');

const {deleteScore, updateScore, getUserScoreDetail, postScore} = require('./../controllers/signIn')

const router = express.Router();

    router.get('/', getUserScoreDetail)

    router.post('/', postScore)

    router.put('/:id', updateScore)

    router.delete('/:id', deleteScore)

module.exports = router