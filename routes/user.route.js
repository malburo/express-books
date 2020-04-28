const express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

const controller = require("../controllers/user.controller");
const validate = require("../middlewares/validates/user.validate");
const adminMiddleware = require("../middlewares/admin.middleware");
const checkIdMiddleware = require("../middlewares/checkId.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/",authMiddleware.requireAuth, adminMiddleware, controller.index);
router.get("/create", controller.create);
router.post("/create", validate.postCreate, controller.postCreate);
router.get("/view/:id",authMiddleware.requireAuth, checkIdMiddleware, controller.get);
router.get("/:id/update",authMiddleware.requireAuth, checkIdMiddleware, controller.update);
router.post("/:id/update",authMiddleware.requireAuth, checkIdMiddleware, upload.single("avatar"), controller.postUpdate);
router.get("/:id/delete",authMiddleware.requireAuth, adminMiddleware, controller.delete);

module.exports = router;