const Book = require("../models/book.model")

module.exports.index = async (req, res, next) => {
  try {
    var a; a.b();
  } catch(e) {
    next(e);
    return;
  }

  let page = parseInt(req.query.page) || 1;
  let perPage = 8;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let books = await Book.find()
  let bookFilter = books.slice(start, end)
  let isEmtyBooks = false;
  if (bookFilter.length === 0) {
    isEmtyBooks = true;
  }
  res.render("books/index", {
    books: bookFilter,
    page: page,
    isEmtyBooks: isEmtyBooks
  });
};
module.exports.create = (req, res) => {
  res.render("books/create");
};
module.exports.postCreate = async (req, res) => {
  let books = await Book;
  books.create(req.body)
  res.redirect("/books");
};
module.exports.get = async (req, res) => {
  let id = req.params.id;
  let book = await Book.findById(id);
  res.render("books/view", {
    book: book
  });
};
module.exports.postUpdate = async (req, res) => {
  let id = req.params.id;
  await Book.findByIdAndUpdate(id, { title: req.body.title });
  res.redirect("/books");
};
module.exports.delete = async (req, res) => {
  let id = req.params.id;
  await Book.findByIdAndRemove(id)
  res.redirect("/books");
};
