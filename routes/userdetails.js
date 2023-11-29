const express = require('express')
const router = express.Router();
const registerController = require('../contoller/registerController')


router.route('/')
    .put(registerController.handleNewUser)

module.exports = router