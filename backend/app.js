// app.js

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/microservice-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
const loginRouter = require('./routes/login');
const restrictedDataRouter = require('./routes/restrictedData');
const fetchDataRouter = require('./routes/fetchData');

app.use('/api', loginRouter);
app.use('/api', authenticateToken, restrictedDataRouter); // Middleware for JWT authentication
app.use('/api', fetchDataRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
