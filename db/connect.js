const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const findListings = require('../controllers/contacts');

dotenv.config();

async function getData() {
  const uri = process.env.DB_URI;

  const client = new MongoClient(uri);

  try {
    //connect to the MongoDB cluster
    await client.connect();

    //make the appropriate DB calls
    await findListings(client);
    //await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = getData;



