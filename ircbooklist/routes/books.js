const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', { title: 'Bookclub || Books', books: books });
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'Bookclub || Books' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.add(req.body);
  res.redirect(303, '/books')
});

module.exports = router;