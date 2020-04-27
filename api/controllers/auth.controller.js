const User = require("../../models/user.model")

module.exports.postLogin = async (req, res) => {
  let user = await User.create(req.body);
  res.json(user)
}