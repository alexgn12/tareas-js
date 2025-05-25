const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/taskControllers");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

router.post("/", ctrl.createTask);
router.delete("/:id", ctrl.deleteById);

router.put("/:id", ctrl.updateById);

module.exports = router;
