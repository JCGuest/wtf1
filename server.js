const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.use('/search', require('./routes/search'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
