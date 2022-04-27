const express = require('express');

const contactsController = require('../controllers/contacts');

const router = express.Router();

//GET /feed/posts
router.get('/', contactsController.getData);
// localhost:8080/contacts-/
module.exports = router;