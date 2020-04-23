let db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = (req, res) => {
  let errors = {};
  let user = db
    .get("users")
    .find({ email: req.body.email })
    .value();
  if (!user) {
    errors.email = "Email is emty";
    errors.password = "Password is emty";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }

  if (user.password !== req.body.password) {
    errors.password = "Password is wrong";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  res.cookie("userId", user.id);
  res.redirect("/");
};
