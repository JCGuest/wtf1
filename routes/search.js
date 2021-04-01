const express = require('express');
const router = express.Router();

const Search = require('../models/Search.js');

router.post('/', (req, res) => {
  try {
    const search = new Search(req.body.query);
    const result = {
      string: search.string(),
      search: search.search()
    };
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500, 'Server Error');
  }
});

module.exports = router;
