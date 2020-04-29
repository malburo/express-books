const express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

const controller = require("../controllers/shop.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const shopMiddleware = require("../middlewares/shop.middleware");

router.get("/:id", controller.index);
router.get("/:id/create",authMiddleware.requireAuth, shopMiddleware, controller.create);
router.post("/:id/create",authMiddleware.requireAuth,shopMiddleware, upload.single("bookCover"), controller.postCreate);
router.get("/:id/:bookId",authMiddleware.requireAuth, shopMiddleware, controller.get);
router.post("/:id/:bookId/update",authMiddleware.requireAuth, shopMiddleware, upload.single("bookCover"), controller.postUpdate);
router.get("/:id/:bookId/delete",authMiddleware.requireAuth, shopMiddleware, controller.delete);

module.exports = router;
