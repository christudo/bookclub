/*
const authors = [
  {firstName: "Viet", lastName: "Thanh Nguyen", authorId: "0"},
  {firstName: "Patricia", lastName: "Beatty", authorId: "1"},
  {firstName: "Jana", lastName: "Laiz", authorId: "2"},
];
*/
const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query('select * from authors order by id');
  return db.camelize(rows);
}

exports.allForBook = async (book) => {
  const { rows } = await db.getPool().query(`
    select authors.* from authors
    JOIN authors_books on authors_books.author_id = authors.id
    where authors_books.book_id = $1;`, [book.id]);
  return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
  return db.camelize(rows)[0]
 }

 exports.create = async (firstName, lastName) => {
  return db.getPool().query("INSERT INTO authors(first_name, last_name) VALUES($1, $2) RETURNING *", [firstName, lastName]);
 }
 
 exports.update = async (id, firstName, lastName) => {
  return db.getPool().query("UPDATE authors SET first_name = $1, last_name = $2 where id = $3 RETURNING *", [firstName, lastName, id]);
 }
 
 exports.upsert = async (author) => {
  if (author.id) {
    return exports.update(author.id, author.firstName, author.lastName)
  }
    return exports.create(author.firstName, author.lastName)
 } 
  
  exports.update = (author) => {
    authors[author.id] = author;
  }