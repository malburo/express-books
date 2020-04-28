const Session = require("../models/session.model")
const Book = require("../models/book.model")
const User = require("../models/user.model")
const Transaction = require("../models/transaction.model")

module.exports.addToCart = async (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.id;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  let session = await Session.findById(sessionId);
  session.cart.push(bookId)
  session.save() 
  // create transaction
  let userId = req.signedCookies.userId;
  let isComplete = false;
  let user = await User.findById(userId)
  let book = await Book.findById(bookId)
  let transaction = { userId, bookId, userName: user.name, bookTitle: book.title, isComplete };
  await Transaction.create(transaction)
  res.redirect("/books");
};


