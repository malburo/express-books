
module.exports = (req, res, next) => {
  if (!res.locals.user.isAdmin) {
    res.redirect("/")
    return;
  }
  next();
};
