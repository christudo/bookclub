const express = require('express');
const router = express.Router();
const BookUser = require('../models/book_user');

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let bookId = req.body.bookId;
  redirect = `/books/show/${bookId}`;
  await BookUser.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your status has been stored',
  };
  res.redirect(303, redirect)
});

module.exports = router