let db = require("../db.js");
module.exports.authorization = (req, res, next) => {
  let user = db
    .get("users")
    .find({ id: req.cookies.userId })
    .value();
  if (user.isAdmin) {
    res.locals.isAdmin = true;
    res.locals.id = user.id;
    next();
  }
  res.locals.isAdmin = false;
  res.locals.id = user.id;
  next();
};
