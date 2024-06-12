// server.js (database server)

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/microservice-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const DataSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
});

const DataModel = mongoose.model('Data', DataSchema);

// Route to fetch data from MongoDB
app.get('/api/fetch-data', (req, res) => {
    DataModel.find({})
    .exec()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

});

// Start server
app.listen(PORT, () => {
  console.log(`Database Server is running on http://localhost:${PORT}`);
});
