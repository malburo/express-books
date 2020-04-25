var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });

    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  let objCart = db.get('sessions').find({id: req.signedCookies.sessionId}).value();
  if(objCart) {
      if(objCart.cart) {
          res.locals.amount = Object.values(objCart.cart).reduce((a,b) => a+b) 
      }
  }
  if (req.signedCookies.userId) {
    let user = db
    .get("users")
    .find({ id: req.signedCookies.userId })
    .value();
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