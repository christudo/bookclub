const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM books ORDER BY id");
  return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM books WHERE id = $1", [id])
  return db.camelize(rows)[0]
}  

exports.allForAuthor = async (author) => {
  const{ rows } = await db.getPool().query ("select books.* from books join authors_books on books.id = authors_books.book_id where author_id = $1", [author.id])
}

exports.allForBook = async (book) => {
  if (book || book.id) {
    return []; // or handle the error in an appropriate way
  }
  const { rows } = await db.getPool().query("SELECT authors.* FROM authors JOIN authors_books ON authors.id = authors_books.author_id WHERE book_id = $1", [book.id]);
  return rows;
}