const express = require('express')
const router = express.Router();
const myContactsController = require('../contoller/contactsController')

router.route('/get')
    .get(myContactsController.getContacts)
router.route('/add')
    .put(myContactsController.addContacts)

module.exports = router