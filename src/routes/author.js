const express = require("express");
const router = express.Router();
const controllers = require("../controllers/author");

router.post("/authors", controllers.createAuthor);
router.get("/authors", controllers.readAuthor);
router.post("/authors/search", controllers.searchAuthor);
router.get("/authors/:id", controllers.readSingleAuthor);
router.patch("/authors/:id", controllers.patchAuthor);
router.delete("/authors/:id", controllers.deleteAuthor);

module.exports = router;
