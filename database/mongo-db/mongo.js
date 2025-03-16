
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.databaseString;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Ping Succuess, connected to MongoDB");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

async function connectToDatabase() {
  if (!client.isConnected?.()) {
    await client.connect();
  }
  return client.db(process.env.DB_NAME); 
}

module.exports = connectToDatabase
