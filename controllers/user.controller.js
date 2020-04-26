let db = require("../db.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.model")
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

module.exports.index = async (req, res) => {
  var users = await User.find()

  res.render("users/index", {
    users: users
  });
};
module.exports.create = (req, res) => {
  res.render("users/create");
};

module.exports.postCreate = async (req, res) => {
  const users = await User
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;
  req.body.avatar =
    "https://res.cloudinary.com/malburo/image/upload/v1587739176/default-avatar_o2xet3.webp";
  const user = {
    name: req.body.name, 
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    wrongLoginCount: 0,
    isAdmin: false
    }; 
    users.create(user);
  res.redirect("/users");
};

module.exports.get = async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id)
  res.render("users/view", {
    users: user
  });
};
module.exports.update = async (req, res) => {
  let id = req.params.id;
  const user = await User.findById(id)
  res.render("users/update", {
    user: user
  });
};
module.exports.postUpdate = async (req, res) => {
  let id = req.params.id;
  req.body.avatar = req.file.path
    .split("/")
    .slice(1)
    .join("/");
  cloudinary.uploader.upload(req.file.path, async (error, result) => {
    req.body.avatar = result.url;
    await User.findByIdAndUpdate(id, { name: req.body.name, avatar: req.body.avatar })
    res.redirect(`/users/view/${id}`);
  });
};
module.exports.delete = async (req, res) => {
  let id = req.params.id;
  await User.findByIdAndRemove(id)
  res.redirect("/users");
};
