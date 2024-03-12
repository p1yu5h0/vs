const { MongoClient } = require("mongodb");

let db = null;

const connect = async () => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
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