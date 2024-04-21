const express = require('express')                  // Include the express package
const app = express()                               // call the express function to create the app
const port = 3000                                   // set the port of the web server
const indexRouter = require('./routes/index');      // Include the new index.js route file
const authorsRouter = require('./routes/authors');

var handlebars = require('express-handlebars').create();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use('/', indexRouter);                          // attaching the router to the “/” url path
app.use('/authors', authorsRouter);

/* GET home page. */
app.use('/', function(req, res, next) {             // the / stands for the root route, or homepage
    res.send("<h1>Happy World Book Day</h1>");      // if the first argument of app.use() is a string, 
  });                                               // In this case, it is used for the index route

// custom 404 page
app.use((req, res) => {                             // set the “default” page handler
  res.type('text/plain')                            // Set the response type to plain text
  res.status(404)                                   // set the response status code to 404
  res.send('404 - Not Found')                       // set the content of the response
})

// custom 500 page
app.use((err, req, res, next) => {                  // set the function of how to deal with errors
  console.error(err.message)                        // get the error message and write it to the console
  res.type('text/plain')                            // Set the response type to plain text
  res.status(500)                                   // set the response status code to 500
  res.send('500 - Server Error')                    // set the content of the response
})

app.listen(port, () => console.log(                 // set our app up to listen to a given port.
`Express started on http://localhost:${port}; ` +   // when listening has started execute this function
`press Ctrl-C to terminate.`))                      // that writes to the console