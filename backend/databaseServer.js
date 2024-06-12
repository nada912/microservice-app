const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const url = 'mongodb://localhost:27017'; 
const dbName = 'microservice-db';

let db;

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  db = client.db(dbName);
  console.log('Connected to MongoDB');

  // API Endpoint to fetch data from MongoDB
  app.get('/api/fetch-data', async (req, res) => {
    try {
      const data = await db.collection('microservice-app').find({}).toArray(); 
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data from MongoDB' });
    }
  });

  app.get('/', (req, res) => {
    res.send('Database server is running');
  });

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Database server running on port ${PORT}`);
  });
});
