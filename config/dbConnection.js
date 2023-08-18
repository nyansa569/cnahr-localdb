

// dbConnection.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/cnahr_localdb'; // Replace with your MongoDB connection string
let dbInstance;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to the MongoDB database');
    dbInstance = client.db(); // Save the database instance to use in controller functions
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
}

function getDb() {
  if (!dbInstance) {
    throw new Error('Database not connected');
  }
  return dbInstance;
}

module.exports = { connectToDatabase, getDb };
