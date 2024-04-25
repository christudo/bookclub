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

router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'Bookclub || Books', authors: await Author.all() });
});

router.get('/edit', async (req, res, next) => {
  let bookId = req.query.id;
  let book = await Book.get(bookId);
  book.authorIds = (await Author.allForBook(book)).map(author => author.id);
  res.render('books/form', { title: 'Bookclub || Books', book: book, authors: await Author.all() });
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
    templateVars ['bookuser'] = await BookUser.get(book, req.session.currentUser);
  }
    res.render('books/show', templateVars);
  });

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

module.exports = router;