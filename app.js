const express = require('express');
const morgan = require('morgan');
const path = require('path');
const lowdb = require('lowdb');
import api from './api/src/api.js';

const db = lowdb('cars.json');
const app = express();

api(db,app);

app.use(morgan('dev'));

app.use('/', express.static('public'));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'public/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
