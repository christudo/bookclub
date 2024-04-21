const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const authors = [
    "Viet Thanh Nguyen", "Patricia Beatty", "Jana Laiz"
  ]
  res.render('authors/index', { title: 'Bookclub || Authors', authors: authors });
});

module.exports = router;
