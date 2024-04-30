const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM authors ORDER BY id");
  return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM authors WHERE id = $1", [id])
  return db.camelize(rows)[0]
}

exports.allForBook = async (book) => {
  const { rows } = await db.getPool().query("SELECT authors.* FROM authors JOIN authors_books ON authors.id = authors_books.author_id WHERE book_id = $1", [book.id]);
  return rows;
}
