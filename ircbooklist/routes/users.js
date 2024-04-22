const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Book = require('../models/book');
const BookUser = require('../models/book_user');
const helpers = require('./helpers')

router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return
  }
  res.render('users/register', { title: 'Bookclub || Registration' });
});

router.post('/register', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  if (helpers.isLoggedIn(req, res)) {
    return
  }
  const user = User.getByEmail(req.body.email)
  if (user) {
    res.render('users/register', {
      title: 'Bookclub || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `A user with this email already exists`}
    });
  } else {
    User.add(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `the user has been created!`,
    };
    res.redirect(303, '/');
  }
});

router.get('/login', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {
    return
  }
  res.render('users/login', { title: 'Bookclub || Login' });
});

router.post('/login', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  if (helpers.isLoggedIn(req, res)) {
    return
  }
  const user = User.login(req.body)
  if (user) {
    req.session.currentUser = user
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'You are now logged in',
    };
    res.redirect(303, '/');
  } else {
    res.render('users/login', {
      title: 'Bookclub || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `Wrong email and password combination or the user could not be found`}
    });
  }
});

router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'You are now logged out',
  };
  res.redirect(303, '/');
});

router.get('/profile', async (req, res, next) => {
  if (helpers.isNotLoggedIn(req, res)) {
    return
  }
  const booksUser = BookUser.AllForUser(req.session.currentUser.email);
  booksUser.forEach((bookUser) => {
    bookUser.book = Book.get(bookUser.bookId)
  })
  res.render('users/profile', { title: 'Bookclub || Profile', user: req.session.currentUser, booksUser: booksUser });
});

module.exports = router
