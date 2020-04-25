const shortid = require("shortid");
let db = require("../db.js");

module.exports.addToCart = (req, res) => {
  var bookId = req.params.id;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + bookId, count + 1)
    .write();

  res.redirect("/books");
};
