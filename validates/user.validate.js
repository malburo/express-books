module.exports.postCreate = (req, res, next) => {
  let errors = {};
  if (!req.body.name) {
    errors.name = "Please provide your name.";
  }
  if (req.body.name.length > 30) {
    errors.nameLength = "Your name is too long";
  }
  if (!req.body.email) {
    errors.email = "Please provide your email.";
  }
  if (!req.body.password) {
    errors.password = "Please provide your password.";
  }
  if (Object.keys(errors).length !== 0) {
    res.render("users/create", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  next();
};
