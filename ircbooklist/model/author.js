const authors = [
  {firstName: "Viet", lastName: "Thanh Nguyen"},
  {firstName: "Patricia", lastName: "Beatty"},
  {firstName: "Jana", lastName: "Laiz"},
];

exports.add = (author) => {
  authors.push(author);
}

exports.all = authors