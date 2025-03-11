
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.databaseString;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    //Connect the client to the server
    await client.connect();
    //ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Ping Succuess, connected to MongoDB");
  } finally {
    //the client will close when finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function connectToDatabase() {
  if (!client.isConnected?.()) {
    await client.connect();
    console.log("Successfull conntected to MongoDB");
  }
  return client.db(process.env.DB_NAME); // Return the database instance
}

module.exports = connectToDatabase
