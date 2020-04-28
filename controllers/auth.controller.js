const bcrypt = require("bcrypt");
const User = require("../models/user.model")
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid');
module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.postLogin = async (req, res) => {
  let errors = {};
  let user = await User.findOne({email: req.body.email})
  if (!user) {
    errors.email = "Email is wrong";
    errors.password = "Password is wrong";
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  if (user.wrongLoginCount >= 4) {
    errors.wrongLoginCount =
      "Bạn đã nhập sai mật khẩu quá nhiều lần liên tiếp, tài khoản của bạn đã bị khóa, nhấp vào quên mật khẩu !!";
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
    user.save()
    errors.password = "Password is wrong";
    // console.log(user.wrongLoginCount);
    res.render("auth/login", {
      errors: errors,
      currentValues: req.body
    });
    return;
  }
  user.wrongLoginCount = 0;
  user.save()
  res.cookie("userId", user.id, {
    signed: true
  });

  res.redirect("/");
};

module.exports.reset = (req, res) => {
  res.render("auth/reset");
};

module.exports.postReset = async (req, res) => {
  let user = await User.findOne({email: req.body.email})
  if(user) {
    user.wrongLoginCount = 0;
    user.save()
    let newPassword = shortid.generate();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.save();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: user.email,
      from: 'tonqquocbao0605@gmail.com',
      subject: `From malburo with love <3`,
      text: `Xin chào,có vẻ như bạn đang gặp vấn đề về đăng nhập, mật khẩu mới của bạn là: ${newPassword}`
    };
    sgMail.send(msg);
    let message = "Chúng tôi đã gửi mật khẩu mới vào email, hãy dùng nó để đăng nhập"
    res.render("auth/reset", {
      message: message
    });
    return
  }  
  let message = "Xin lỗi, email này chưa được đăng kí"
  res.render("auth/reset", {
    message: message
  });
};