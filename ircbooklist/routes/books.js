const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const books = [
    "The Refugees", "Lupita Mañana", "Weeping Under This Same Moon"
  ]
  res.render('books/index', { title: 'Bookclub || books', books: books });
});

module.exports = router;