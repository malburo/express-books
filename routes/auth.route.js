const express = require("express");
var router = express.Router();

const controller = require("../controllers/auth.controller");
router.get("/login", controller.login);
router.post("/login", controller.postLogin);
router.get("/login/reset", controller.reset);
router.post("/login/reset", controller.postReset);
router.get("/logout", controller.logout);
module.exports = router;
