const express = require("express");
const router = express.Router();
const controllers = require("../controllers/genre");

router.post("/genres", controllers.createGenre);
router.get("/genres", controllers.readGenre);
router.post("/genres/search", controllers.searchGenre);
router.get("/genres/:id", controllers.readSingleGenre);
router.patch("/genres/:id", controllers.patchGenre);
router.delete("/genres/:id", controllers.deleteGenre);

module.exports = router;
