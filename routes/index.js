const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Nelli Suggs')
});

module.exports = routes