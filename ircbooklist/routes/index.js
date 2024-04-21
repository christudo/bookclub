const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {                      // this is like the app.use, but specifically for routing
  res.send("<h1>Happy World Book Day</h1>");
});

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Bookclub' });
  });
  
module.exports = router;
