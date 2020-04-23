let db = require("../db.js");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};
module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  db.get("users")
    .push(req.body)
    .write();
  console.log(db.get("users").value());
  res.redirect("/users");
};

module.exports.get = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/view", {
    user: user
  });
};
module.exports.update = (req, res) => {
  let id = req.params.id;
  let user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", {
    user: user
  });
};
module.exports.postUpdate = (req, res) => {
  let id = req.params.id;
  db.get("users")
    .find({ id: id })
    .assign({ name: req.body.name })
    .write();
  res.redirect("/users");
};
module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};
