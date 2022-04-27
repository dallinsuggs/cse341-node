const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));

module.exports = router;

/* const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Nelli Suggs')
});

module.exports = routes */