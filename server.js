const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json()); // needed for parsing json requests

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/views/public/index.html');
});

app.use(
  '/search',
  cors({ origin: 'http://localhost:3000' }),
  require('./routes/search')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
