
module.exports = (req, res, next) => {
    if (req.signedCookies.userId !== req.params.id) {
      res.redirect("/")
      return;
    }
    next();
  };
  