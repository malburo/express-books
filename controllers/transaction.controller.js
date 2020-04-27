const Book = require("../models/book.model")
const User = require("../models/user.model")
const Transaction = require("../models/transaction.model")

module.exports.index = async (req, res) => {
  if (res.locals.user.isAdmin) {
    let transactions = await Transaction.find()
    res.render("transactions/index", {
      transactions: transactions
    });
    return;
  }
  let transactionFilterById = await Transaction.find({id: req.signedCookies.userId})
  console.log(transactionFilterById);
  res.render("transactions/index", {
    transactions: transactionFilterById
  });
};

module.exports.create = async (req, res) => {
  let result = await Promise.all([User.find(), Book.find()])
  res.render("transactions/create", {
    users: result[0],
    books: result[1]
  });
};
module.exports.postCreate = async (req, res) => {
  let userId = req.body.userId;
  let bookId = req.body.bookId;
  let isComplete = false;
  let user = await User.findById(userId)
  let book = await Book.findById(bookId)
  let transaction = { userId, bookId, userName: user.name, bookTitle: book.title, isComplete };
  let Transactions = await Transaction
  Transactions.create(transaction)
  res.redirect("/transactions");
};
module.exports.complete = async (req, res) => {
  let id = req.params.id
  await Transaction.findByIdAndUpdate(id, { isComplete: true })
  res.redirect("/transactions");
};
