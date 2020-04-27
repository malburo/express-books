
module.exports = (req, res, next) => {
  if (req.params.id !== req.signedCookies.userId) {
    if(res.locals.user.isAdmin){
        next();
        return;
    }
    res.redirect("/")
    return;
  }
  next();
};
