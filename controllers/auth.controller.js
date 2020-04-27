
const bcrypt = require("bcrypt");
const User = require("../models/user.model")

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  let errors = {};
  let user = await User.findOne({email: req.body.email})
  console.log(user)
  if (!user) {
    errors.email = "Email is emty";
    errors.password = "Password is emty";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  if (user.wrongLoginCount >= 4) {
    // const mailgun = require("mailgun-js");
    // const api_key = "";
    // const DOMAIN = "sandboxe6b9e87a28134c08bbf4f23d91924e7e.mailgun.org";
    // const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
    // const data = {
    //   from: "Admin <vickyvuvo@gmail.com>",
    //   to: "tonqquocbao@gmail.com",
    //   subject: "Hello",
    //   text: "Testing some Mailgun awesomness!"
    // };
    // mg.messages().send(data, function(error, body) {
    //   console.log(body);
    // });
    errors.wrongLoginCount =
      "Bạn đã nhập sai mật khẩu 4 lần liên tiếp, tài khoản của bạn đã bị khóa, vui lòng gặp trực tiếp admin để mở khóa tài khoản =))";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    //login
    user.wrongLoginCount++;
    errors.password = "Password is wrong";
    // console.log(user.wrongLoginCount);
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  user.wrongLoginCount = 0;
  res.cookie("userId", user.id, {
    signed: true
  });

  res.redirect("/");
};
