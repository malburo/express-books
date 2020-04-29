const Book = require("../models/book.model")
const User = require("../models/user.model")
let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports.index = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    if(user){
        res.locals.nameStore = user.name
      } else{
        res.redirect("/")
      }
  } catch(err) {
      next("Trang này không khả dụng")
  }
  if (req.signedCookies.userId === req.params.id) {
    res.locals.isSeller = true;
  }
  let page = parseInt(req.query.page) || 1;
  let perPage = 8;
  let start = (page - 1) * perPage;
  let end = page * perPage;
  let books = await Book.find({seller: req.params.id}).sort({_id: -1})
  let bookFilter = books.slice(start, end)
  let isEmtyBooks = false;
  if (bookFilter.length === 0) {
    isEmtyBooks = true;
  }
  res.render("shop/index", {
    books: bookFilter,
    page: page,
    isEmtyBooks: isEmtyBooks
  });
};
module.exports.create = (req, res) => {
  res.render("shop/create");
};
module.exports.postCreate = async (req, res) => {
  req.body.seller = req.signedCookies.userId;
  let user = await User.findById(req.signedCookies.userId)
  req.body.nameSeller = user.name;
  if(req.file) {
      req.body.bookCover = req.file.path
        .split("/")
        .slice(1)
        .join("/");
      cloudinary.uploader.upload(req.file.path, async (error, result) => {
        req.body.bookCover = result.url;
        await Book.create(req.body)
        res.redirect(`/shop/${req.signedCookies.userId}`);
      });
    return
  }
  req.body.bookCover = "https://res.cloudinary.com/malburo/image/upload/v1588082666/book_j9pihg.jpg"
  await Book.create(req.body)
  res.redirect(`/shop/${req.signedCookies.userId}`);
};
module.exports.get = async (req, res) => {
  let id = req.params.bookId;
  let book = await Book.findById(id);
  res.render("shop/view", {
    book: book
  });
};
module.exports.postUpdate = async (req, res) => {
  let id = req.params.bookId;
  if(req.file) {
      req.body.bookCover = req.file.path
        .split("/")
        .slice(1)
        .join("/");
      cloudinary.uploader.upload(req.file.path, async (error, result) => {
        req.body.bookCover = result.url;
        await Book.findByIdAndUpdate(id, {title: req.body.title, decription: req.body.decription, bookCover: req.body.bookCover})
        res.redirect(`/shop/${req.signedCookies.userId}`);
      });
      return
    } 
    await Book.findByIdAndUpdate(id, {title: req.body.title, decription: req.body.decription})
    res.redirect(`/shop/${req.signedCookies.userId}`);
};
module.exports.delete = async (req, res) => {
  let id = req.params.bookId;
  await Book.findByIdAndRemove(id)
  res.redirect(`/shop/${req.signedCookies.userId}`);
};
