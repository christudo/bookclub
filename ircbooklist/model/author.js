const authors = [
  {firstName: "Viet", lastName: "Thanh Nguyen"},
  {firstName: "Patricia", lastName: "Beatty"},
  {firstName: "Jana", lastName: "Laiz"},
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