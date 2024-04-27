
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
  const{ rows } = await db.getPool().query ("select authors.* from authors join authors_books on authors.id = authors_books.author_id where book_id = $1", [book.id])
}