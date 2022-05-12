/* eslint-disable no-underscore-dangle */
// .env variables DB_URI
const dotenv = require('dotenv');

dotenv.config();

//database code
const MongoClient = require('mongodb').MongoClient;

// eslint-disable-next-line no-unused-vars
let _client;
let _collection;

const initDatabase = () => {
  MongoClient.connect(process.env.DB_URI, (err, client) => {
    if (err) throw err;
    _client = client;
    _collection = client.db('contacts_db').collection('contacts');
    console.log('DB Connected Successfully');
  });
};

// eslint-disable-next-line arrow-body-style
const getCollection = () => {
  return _collection;
};


module.exports = { initDatabase, getCollection };
