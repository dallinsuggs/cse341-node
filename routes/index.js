const routes = require('express').Router();
const express = require('express')

routes.use('/', require('./home'));
routes.use('/contacts', require('./contacts'));
routes.use(express.json());

module.exports = routes