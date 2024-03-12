const { MongoClient } = require("mongodb");

let db = null;

const connect = async (database) => {
  const client = new MongoClient(database);
  console.log('connecting with the db');
  await client.connect();
  db = client.db('videodb');
  console.log('connected with the db');
  return db;
};

const getDb = () => {
  return db;
}

module.exports = {
  connect,
  getDb
}