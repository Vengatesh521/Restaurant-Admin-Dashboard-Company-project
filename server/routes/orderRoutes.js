const router = require("express").Router();
const c = require("../controllers/orderController");

router.get("/:id", c.getOne);

router.get("/", c.getAll);
router.post("/", c.create);
router.patch("/:id/status", c.updateStatus);

module.exports = router;
