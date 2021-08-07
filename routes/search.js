const express = require('express');
const router = express.Router();

const Search = require('../models/Search.js');

router.post('/', async (req, res) => {
  try {
    let search = new Search(req.body.query);
    console.log([search.raceName, search.year, search.position]);
    let result = await search.search();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.send('there was a probem with your request');
  }
});

module.exports = router;
