const User = require("../models/user.model")
const Session = require("../models/session.model")

module.exports = async (req, res, next) => {
  if (!req.signedCookies.sessionId) {
    let session = new Session({
      cart: []
    })
    session.save();
    res.cookie('sessionId', session.id, {
      signed: true
    });
  }
  let objCart = await Session.findById(req.signedCookies.sessionId)
  if(objCart) {
      if(objCart.cart) {
          res.locals.amount = objCart.cart.length
      }
  }
  if (req.signedCookies.userId) {
    let user = await User.findById(req.signedCookies.userId)
    res.locals.user = user
  }
  else {
      let user = {
          name: "vô danh"
      }
      res.locals.user = user
  }
  next();
}