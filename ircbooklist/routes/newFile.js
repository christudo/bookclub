const Author = require('../models/author');
const { router } = require('./authors');

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.add(req.body);
  res.redirect(303, '/authors');
});
