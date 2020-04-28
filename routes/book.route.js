const express = require("express");
var router = express.Router();

const controller = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

router.get("/", controller.index);
router.get("/create",authMiddleware.requireAuth, adminMiddleware, controller.create);
router.post("/create",authMiddleware.requireAuth, adminMiddleware, controller.postCreate);
router.get("/:id",authMiddleware.requireAuth, adminMiddleware, controller.get);
router.post("/:id/update",authMiddleware.requireAuth, adminMiddleware, controller.postUpdate);
router.get("/:id/delete",authMiddleware.requireAuth, adminMiddleware, controller.delete);

module.exports = router;
