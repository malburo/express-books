const express = require("express");
var router = express.Router();

const controller = require("../controllers/cart.controller");

router.get("/:id", controller.addToCart);

module.exports = router;
