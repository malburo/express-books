const shortid = require("shortid");
let db = require("../db.js");

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1;

  let perPage = 8;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let books = db
    .get("books")
    .value()
    .slice(start, end);
  let isEmtyBooks = false;
  if (Object.keys(books).length === 0) {
    isEmtyBooks = true;
  }
  res.render("books/index", {
    books: books,
    page: page,
    isEmtyBooks: isEmtyBooks
  });
};
module.exports.create = (req, res) => {
  res.render("books/create");
};
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};
module.exports.get = (req, res) => {
  let id = req.params.id;
  let book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("books/view", {
    book: book
  });
};
module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ title: req.body.title })
    .write();
  res.redirect("/books");
};
module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
};
