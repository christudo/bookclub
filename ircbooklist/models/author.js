const authors = [
  {firstName: "Viet", lastName: "Thanh Nguyen", authorIds: ["0", "2"]},
  {firstName: "Patricia", lastName: "Beatty", authorId: "1"},
  {firstName: "Jana", lastName: "Laiz", authorId: "2"},
];

exports.add = (author) => {
  authors.push(author);
}

exports.get = (idx) => {
  return authors[idx];
}

exports.update = (author) => {
  authors[author.id] = author;
}

exports.upsert = (author) => {
  if (author.id) {
    exports.update(author);
  } else {
    exports.add(author);
  }
}

exports.all = authors