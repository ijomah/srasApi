const express = require('express');

const router = express.Router();
// const multer = require('multer');
// const upload = multer();
router.use(express.json())
// const db = require("../dbconfig/configDb");
const { 
    getUser, 
    regUser, 
    updateRegister, 
    deleteRegEntry 
} = require('../controllers/reg');


    router
        .get('/', getUser)
        .post('/', regUser)
        .patch('/:id', updateRegister)
        .delete('/:id', deleteRegEntry)

module.exports = router