const User = require("../models/user.model")
const Session = require("../models/session.model")

module.exports = async (req, res, next) => {
  res.locals.user = {};
  res.locals.isLogin = false;
  if (!req.signedCookies.sessionId) {
    let session = new Session({
      cart: {}
    })
    session.save();
    res.cookie('sessionId', session.id, {
      signed: true
    });
  }
  let findSession = await Session.findById(req.signedCookies.sessionId)
  if (findSession !== null && findSession.cart) {
    res.locals.amount = await Object.values(findSession.cart).reduce((a, b) => {
      return a + b;
    }, 0)
  }
  if (req.signedCookies.userId) {
    let user = await User.findById(req.signedCookies.userId)
    res.locals.user = user
    res.locals.isLogin = true;
  }
  next();
}