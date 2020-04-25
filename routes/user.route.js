const express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

const controller = require("../controllers/user.controller");
const validate = require("../validates/user.validate");

router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", validate.postCreate, controller.postCreate);
router.get("/view/:id", controller.get);
router.get("/:id/update", controller.update);
router.post("/:id/update", upload.single("avatar"), controller.postUpdate);
router.get("/:id/delete", controller.delete);

module.exports = router;
