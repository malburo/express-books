let db = require("../db.js");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "malburo",
  api_key: "173387749476429",
  api_secret: "FAapfVJZfRgu4m6eZ-JJKqzfvPY"
});

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
  req.body.avatar =
    "https://res.cloudinary.com/malburo/image/upload/v1587739176/default-avatar_o2xet3.webp";
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
  req.body.avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  cloudinary.uploader.upload(req.file.path, function(error, result) {
    req.body.avatar = result.url;
    db.get("users")
      .find({ id: id })
      .assign({ name: req.body.name, avatar: req.body.avatar })
      .write();
    res.redirect(`/users/view/${id}`);
  });
};
module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};
