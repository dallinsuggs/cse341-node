const {MongoClient} = require('mongodb');

async function main() {
  const uri = "mongodb+srv://willhawkes:3e1venkinG5!@cluster0.hr3jb.mongodb.net/contacts_db?retryWrites=true&w=majority";

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

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
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
      console.log(`${i + 1}. ${JSON.stringify(result)}`);
    });
  }
}

