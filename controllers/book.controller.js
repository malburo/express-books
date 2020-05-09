const Book = require("../models/book.model");
let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

module.exports.index = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  let perPage = 8;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let books = await Book.find().sort({ _id: -1 });
  let bookFilter = books.slice(start, end);
  let isEmtyBooks = false;
  if (bookFilter.length === 0) {
    isEmtyBooks = true;
  }
  res.render("books/index", {
    books: bookFilter,
    page: page,
    isEmtyBooks: isEmtyBooks,
  });
};

module.exports.search = async (req, res, next) => {
  let books = await Book.find().sort({ _id: -1 });
  let booksSearch = books.filter((book) => {
    return book.title.toLowerCase().indexOf(req.query.title.toLowerCase()) >= 0;
  });
  res.render("books/index", {
    books: booksSearch,
  });
};
