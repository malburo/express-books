const express = require("express");
var router = express.Router();

const controller = require("../controllers/transaction.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
router.get("/", controller.index);
router.get("/create",adminMiddleware, controller.create);
router.post("/create",adminMiddleware, controller.postCreate);
router.get("/:id/complete", controller.complete);
module.exports = router;
