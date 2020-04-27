const express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

const controller = require("../controllers/user.controller");
const validate = require("../validates/user.validate");
const adminMiddleware = require("../middlewares/admin.middleware");
const checkIdMiddleware = require("../middlewares/checkId.middleware");
router.get("/",adminMiddleware, controller.index);
router.get("/create", controller.create);
router.post("/create", validate.postCreate, controller.postCreate);
router.get("/view/:id",checkIdMiddleware, controller.get);
router.get("/:id/update",checkIdMiddleware, controller.update);
router.post("/:id/update",checkIdMiddleware, upload.single("avatar"), controller.postUpdate);
router.get("/:id/delete",adminMiddleware, controller.delete);

module.exports = router;
