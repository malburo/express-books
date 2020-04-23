module.exports.postCreate = (req, res, next) => {
  let errors = {};
  if (!req.body.name) {
    errors.name = "Name is required";
  }
  if (req.body.name.length > 30) {
    errors.nameLength = "Your name is too long";
  }
  if (!req.body.email) {
    errors.email = "Email is required";
  }
  if (!req.body.password) {
    errors.password = "Password is required";
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
