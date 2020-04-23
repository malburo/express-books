const db = require("../db.js");
const bcrypt = require("bcrypt");

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
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
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    //login
    errors.password = "Password is wrong";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  res.cookie("userId", user.id, {
    signed: true
  });
  res.redirect("/");
};
