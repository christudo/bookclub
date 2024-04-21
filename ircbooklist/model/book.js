const books = [
    {title: "The Refugees", publishingYear: 2016},
    {title: "Lupita Mañana", publishingYear: 1998},
    {title: "Weeping Under This Same Moon", publishingYear: 2008}
  ];
  
  exports.add = (book) => {
    books.push(book);
  }
  
  exports.all = books