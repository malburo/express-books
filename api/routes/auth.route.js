const express = require("express");
var router = express.Router();

const controller = require("../controllers/auth.controller");

router.post("/", controller.postLogin);

module.exports = router;
