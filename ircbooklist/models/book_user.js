const books_users = [
    {bookId: "0", userEmail: "cdacruz@pratt.edu", status: "done reading"},
    {bookId: "1", userEmail: "rvanmech@pratt.edu", status: "reading"},
    {bookId: "2", userEmail: "dpan@pratt.edu", status: "to read"},
    {bookId: "3", userEmail: "cdacruz@pratt.edu", status: "reading"}
  ];
  
  exports.statuses = [
    "to read","reading","done reading"
  ]
  
  exports.add = (book_user) => {
    books_users.push(book_user);
  }

  exports.update = (idx, book_user) => {
    books_users[idx] = book_user;
  }
  
  exports.upsert = (book_user) => {
    let idx = books_users.findIndex((bu) => {
      return bu.bookId == book_user.bookId &&
             bu.userEmail == book_user.userEmail;
    });
    if (idx == -1) {
      exports.add(book_user);
    } else {
      exports.update(idx,book_user);
    }
  }
  
  exports.get = (bookId, userEmail) => {
    return books_users.find((book_user) => {
      return book_user.bookId == bookId && book_user.userEmail == userEmail;
    });
  }
  
  exports.AllForUser = (userEmail) => {
    return books_users.filter((book_user) => {
      return book_user.userEmail == userEmail;
    });
  }
  