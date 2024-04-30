/*
const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const BookUser = require('../models/book_user');
const Book = require('../models/book');

router.get('/', async (req, res, next) => {
  const authors = await Author.all();
  res.render('authors/index', { title: 'Bookclub || Books', authors: authors });
 });

 router.get('/show/:id', async (req, res, next) => {
  const author = await Author.get (req.params.id)
  let templateVars = {
    title: 'Bookclub || Authors',
    author: author,
    authorId: req.params.id,
    statuses: BookUser.statuses
  };

  author.books = await Book.allForAuthor(author);
  if (req.session.currentUser){
    templateVars ['bookuser'] = await BookUser.get(book, req.session.currentUser);
  }
    res.render('books/show', templateVars);
  });


module.exports = router;
*/
