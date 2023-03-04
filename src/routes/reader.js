const express = require("express");
const router = express.Router();
const controllers = require("../controllers/reader");

router.post("/readers", controllers.createReader);
router.get("/readers", controllers.readReader);
router.get("/readers/:id", controllers.readSingleReader);
router.patch("/readers/:id", controllers.patchReader);
router.delete("/readers/:id", controllers.deleteReader);

module.exports = router;
