const Book = require("../models/book.model")
let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports.index = async (req, res, next) => {
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
  console.log(req.body)
  if(req.file) {
      req.body.bookCover = req.file.path
        .split("/")
        .slice(1)
        .join("/");
      cloudinary.uploader.upload(req.file.path, async (error, result) => {
        req.body.bookCover = result.url;
        await Book.create(req.body)
        res.redirect("/books");
      });
    return
  }
  req.body.bookCover = "https://res.cloudinary.com/malburo/image/upload/v1588082666/book_j9pihg.jpg"
  await Book.create(req.body)
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
  if(req.file) {
      req.body.bookCover = req.file.path
        .split("/")
        .slice(1)
        .join("/");
      cloudinary.uploader.upload(req.file.path, async (error, result) => {
        req.body.bookCover = result.url;
        await Book.findByIdAndUpdate(id, {title: req.body.title, decription: req.body.decription, bookCover: req.body.bookCover})
        res.redirect("/books");
      });
      return
    } 
    await Book.findByIdAndUpdate(id, {title: req.body.title, decription: req.body.decription})
    res.redirect("/books");
};
module.exports.delete = async (req, res) => {
  let id = req.params.id;
  await Book.findByIdAndRemove(id)
  res.redirect("..");
};
