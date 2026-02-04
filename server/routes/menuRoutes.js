const router = require("express").Router();
const c = require("../controllers/menuController");

router.get("/", c.getAll);
router.get("/search", c.search);
router.get("/:id", c.getOne);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.delete);
router.patch("/:id/availability", c.toggle);

module.exports = router;
