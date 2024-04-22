const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', function(req, res, next) {
  const authors = Author.all;
  res.render('authors/index', { title: 'Bookclub || Authors', authors: authors });
});

router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'Bookclub || Authors' });
});

router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'Bookclub || Authors', author: author, authorIndex: authorIndex });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors');
});


module.exports = router;

