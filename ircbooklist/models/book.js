/*const books = [
    {title: "The Refugees", publishingYear: 2016, recommendationYear: 2023, authorIds: ["0"], bookId: "951955956"},
    {title: "Lupita Mañana", publishingYear: 1998, recommendationYear: 2023, authorIds: ["1"], bookId: "982159393"},
    {title: "Weeping Under This Same Moon", publishingYear: 2008, recommendationYear: 2023, authorIds: ["2"], bookId: "229036096"}
  ];*/
const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM books ORDER BY id");
  return db.camelize(rows);
}

  exports.add = async (book) => {
    const { rows } = await db.getPool()
    .query("INSERT INTO books(title, publishing_year, year_of_rec) VALUES($1, $2, $3) RETURNING *",
    [book.title, book.description, book.publishingYear, book.recommendationYear]
  );
    let newBook = db.camelize(rows)[0]
    await addAuthorsToBook(newBook, book.authorIds)
    return newBook
  }

  exports.get = async (id) => {
    const { rows } = await db.getPool().query("SELECT * FROM books WHERE id = $1", [id])
  return db.camelize(rows)[0]
  }  

  exports.update = async (book) => {
    const { rows } = await db.getPool()
    .query("UPDATE books SET title = $1, publishing_year = $2, year_of_rec = $3 where id = $4 RETURNING *",
    [book.title, book.description, book.publishingYear, book.recommendationYear, book.id]
  );
    let newBook = db.camelize(rows)[0]
    await DeleteAuthorsForBook(newBook) // By first deleting the relevant authors_books records, we prevent accidental duplicates
    await addAuthorsToBook(newBook, book.authorIds)
  return newBook
  }
  
  exports.upsert = async (book) => {
    if (book.authorIds && ! Array.isArray(book.authorIds)) {
      book.authorIds = [book.authorIds];
    }
    if (book.id) {
      return exports.update(book);
    } else {
      return exports.add(book);
    }
  }

  const addAuthorsToBook = async (book, authorIds) => {
    authorIds.forEach(async (authorId) => {
      await db.getPool().query(`
        INSERT INTO authors_books(author_id, book_id) values($1,$2)
        `,[authorId,book.id])
    })
  }
  
  const DeleteAuthorsForBook = async (book) => {
    db.getPool().query("DELETE FROM authors_books WHERE book_id = $1", [book.id]);
  }