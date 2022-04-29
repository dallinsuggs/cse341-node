const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv')

dotenv.config();

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_URI;
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("contacts_db");
  dbo.collection("contacts").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});