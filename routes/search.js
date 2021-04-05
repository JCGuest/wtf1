const express = require('express');
const router = express.Router();

const Search = require('../models/Search.js');

router.post('/', async (req, res) => {
  try {
    const search = new Search(req.body.query);
    // const round = await search.findRound();
    // console.log(round);
    const result = await search.search();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500, 'Server Error');
  }
});

module.exports = router;
