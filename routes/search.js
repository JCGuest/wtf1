const express = require('express');
const router = express.Router();

const Search = require('../models/Search.js');

router.post('/', async (req, res) => {
  try {
    let search = new Search(req.body.query);
    let round = await search.findRound();
    console.log("ROUND >>" + round);
    let result = await search.search();
    console.log("RESULT >>" + result);
    res.json(result);
  } catch (err) {
    console.error("ERROR >>" + err);
    res.status(500, 'Server Error');
  }
});

module.exports = router;
