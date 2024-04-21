const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', { title: 'Bookclub || Authors', authors: authors });
});

router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'Bookclub || Authors' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Author.add(req.body);
  res.redirect(303, '/authors')
});


module.exports = router;
