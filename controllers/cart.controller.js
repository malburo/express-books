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
  res.redirect("/books");
};

module.exports.pay = async (req, res) => {
  if(req.signedCookies.userId) {
    let sessions = await Session.findById(req.signedCookies.sessionId)
    let listOrder = sessions.cart
    let userId = req.signedCookies.userId;
    let user = await User.findById(userId)
    for(idBook of listOrder) {
      let book = await Book.findById(idBook)
      let transaction = { 
        userId,
        bookId: idBook,
        userName: user.name, 
        bookTitle: book.title, 
        isComplete: false 
      };
      await Transaction.create(transaction)
    }
    sessions.cart = [];
    sessions.save()
    res.redirect("/transactions");
    return
  }
  res.redirect("/");
}

