//make actual call to mongodb to get data

require('dotenv').config();

async function getData() {
  console.log("I'm in routes/contacts");
  const uri = process.env.DB_URI;

  const client = new MongoClient(uri);

  try {
    //connect to the MongoDB cluster
    await client.connect();

    console.log("We have a connection!");

    //make the appropriate DB calls
    await findListings(client);
    //await listDatabases(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}



async function findListings(client) {
  const cursor = client
    .db('contacts_db')
    .collection('contacts')
    .find();

  const results = await cursor.toArray();
  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      console.log();
      console.log(JSON.stringify(result));
    });
  }
}

module.exports = getData;

module.exports = findListings;
