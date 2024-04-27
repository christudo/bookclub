const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const router = express.Router();

/*router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', { title: 'Bookclub || books', books: books });
});*/
router.get('/', async (req, res, next) => {
  const books = await Book.all();
  res.render('books/index', { title: 'Bookclub || Books', books: books });
 });

router.get('/show/:id', async (req, res, next) => {
  const book = await Book.get (req.params.id)
  let templateVars = {
    title: 'Bookclub || Books',
    book: book,
    bookId: req.params.id,
    statuses: BookUser.statuses
  };

  book.authors = await Author.allForBook(book);
  if (req.session.currentUser){
    templateVars['bookUser'] = await BookUser.get(book, req.session.currentUser);
  }
    res.render('books/show', templateVars);
  });

module.exports = router;