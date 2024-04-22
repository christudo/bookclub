const express = require('express');
const router = express.Router();

const Author = require('../models/author');
const Book = require('../models/book');


router.get('/', async (req, res, next) => {
  let authors = await Author.all();
  res.render('authors/index', { title: 'Bookclub || Authors', authors: authors });
 }); 

router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'Bookclub || Authors' }
  if (req.query.id) {
    let author = await Author.get(req.query.id)
    if (author) {templateVars['author'] = author}
  }
  res.render('authors/form', templateVars);
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