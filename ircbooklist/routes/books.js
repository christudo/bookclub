const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const router = express.Router();

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', { title: 'Bookclub || books', books: books });
});

router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'Bookclub || Books', authors: Author.all });
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  res.render('books/form', { title: 'Bookclub || Books', book: book, bookIndex: bookIndex, authors: Author.all });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'Bookclub || Books',
    book: Book.get(req.params.id),
    bookId: req.params.id,
    statuses: BookUser.statuses
  }
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId));
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email);
  }
  res.render('books/show', templateVars);
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

module.exports = router;