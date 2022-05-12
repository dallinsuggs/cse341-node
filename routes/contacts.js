const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const express = require('express');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(express.json());

//GET ALL CONTACTS
routes.get('/', (req, res) => {
  const results = connect.getCollection().find();
  results.toArray().then((documents) => {
      res.status(200).json(documents);
      console.log('Returned All Contacts');
  });
});

//GET 1 CONTACT
routes.get('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const results = connect.getCollection().find({ _id: contactId });
  results.toArray().then((documents) => {
      res.status(200).json(documents[0]);
      console.log(`Returned Contact ${req.params.id}`);
  });
});

//POST 1 NEW CONTACT
routes.post('/', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line no-new-object
  // const newDoc = new Object(req.body);
  const newDoc = new Object({
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const result = connect.getCollection().insertOne(newDoc)
    // eslint-disable-next-line no-shadow
    .then(result => {
      res.json(`New listing created with the following id: ${result.insertedId}`);
    })
    .catch(error => console.error(error));
  console.log(`New listing created with the following id: ${result.insertedId}`);
});

//PUT UPDATE TO CONTACT
routes.put('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  // eslint-disable-next-line no-new-object
  const newDoc = new Object(req.body);
  connect.getCollection().replaceOne({ _id: contactId }, newDoc)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      res.json(`Updated listing for id ${req.params.id}`);
    })
    .catch(error => console.error(error));
  console.log(`Updated listing for id ${req.params.id}`);
});

//DELETE CONTACT
routes.delete('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  connect.getCollection().deleteOne({ _id: contactId })
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      res.json(`Deleted listing id ${req.params.id}`);
    })
    .catch(error => console.error(error));
  console.log(`Deleted listing id ${req.params.id}`);
});

module.exports = routes;
