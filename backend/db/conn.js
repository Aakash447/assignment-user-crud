const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let dbConnection;

async function connectDB() {
  try {
    await client.connect();
    dbConnection = client.db(process.env.DB_NAME); // Replace with your DB name
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getDB() {
  if (!dbConnection) {
    throw new Error('Database connection not established.');
  }
  return dbConnection;
}

module.exports = {
  connectDB,
  getDB,
};