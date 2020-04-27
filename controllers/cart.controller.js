const Session = require("../models/session.model")

module.exports.addToCart = async (req, res) => {
  const bookId = req.params.id;

  const sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  let session = await Session.findById(sessionId);
  session.cart.push(bookId)
  session.save() 
  res.redirect("/books");
};
