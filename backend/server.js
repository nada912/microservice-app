const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret_key';
const USERS = [{ username: 'nada', password: 'nada' }];

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`Received login attempt with username: ${username} and password: ${password}`);
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) {
    console.log('Invalid credentials');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token: accessToken });
});

app.get('/api/restricted-data', authenticateToken, async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/api/fetch-data');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from database server' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
