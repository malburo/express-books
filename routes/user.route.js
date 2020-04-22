const express = require("express");
var router = express.Router();

const controller = require("../controllers/user.controller");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
router.get("/view/:id", controller.get);
router.get("/:id/update", controller.update);
router.post("/:id/update", controller.postUpdate);
router.get("/:id/delete", controller.delete);

module.exports = router;
