require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const apiRoutes = require('./api/apiRoutes');
const client = require('./database/mongo-db/mongo')
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.static(path.join(__dirname, './dist')));

app.use('/api', apiRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});