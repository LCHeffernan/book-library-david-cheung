const express = require("express");
const router = express.Router();
const controllers = require("../controllers/book");

router.post("/books", controllers.createBook);
router.get("/books", controllers.readBook);
router.get("/books/:id", controllers.readSingleBook);
router.patch("/books/:id", controllers.patchBook);
router.delete("/books/:id", controllers.deleteBook);

module.exports = router;
