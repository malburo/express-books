let db = require("../db.js");
const shortid = require("shortid");

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};
module.exports.create = (req, res) => {
  res.render("users/create");
};
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
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
