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