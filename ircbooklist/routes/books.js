const express = require('express');
const Book = require('../models/book');
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const { template } = require('lodash');
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

  const books = await Author.allForBook(book);
  console.log(books)
  book.authors = books;
  if (req.session.currentUser){
    templateVars['bookUser'] = await BookUser.get(book, req.session.currentUser);
  }
  console.log(templateVars)
  res.render('books/show', templateVars);
  });

module.exports = router;