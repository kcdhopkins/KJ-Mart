require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const apiRoutes = require('./api/apiRoutes');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.static(path.join(__dirname, './dist')));

app.use('/api', apiRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});