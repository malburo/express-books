const express = require("express");
var router = express.Router();

const controller = require("../controllers/book.controller");

router.get("/", controller.index);

module.exports = router;
