const express = require('express');
const app = express();

const cors = require('cors');

const path = require('path');

app.use(express.json()); // needed for parsing json requests

app.use(express.static(path.join(__dirname, 'views/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/build/index.html'));
});

app.use(
  '/search',
  cors({ origin: 'http://localhost:3000' }),
  require('./routes/search')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
