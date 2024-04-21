const books = [
    {title: "The Refugees", publishingYear: 2016},
    {title: "Lupita Mañana", publishingYear: 1998},
    {title: "Weeping Under This Same Moon", publishingYear: 2008}
  ];
  
  exports.add = (book) => {
    books.push(book);
  }
  
  exports.get = (idx) => {
    return books[idx];
  }
  
  exports.update = (book) => {
    books[book.id] = book;
  }
  
  exports.upsert = (book) => {
    if (book.authorIds && ! Array.isArray(book.authorIds)) {
      book.authorIds = [book.authorIds];
    }
    if (book.id) {
      exports.update(book);
    } else {
      exports.add(book);
    }
  }
  
  exports.all = books