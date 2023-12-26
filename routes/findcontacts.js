const express = require('express')
const router = express.Router();
const findContactController = require('../contoller/findContactController')

router.route('/')
    .get(findContactController.findcontact)


module.exports = router