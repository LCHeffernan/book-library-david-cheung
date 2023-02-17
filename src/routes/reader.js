const express = require("express");
const router = express.Router();
const controllers = require("../controllers/reader");

router.post("/readers", controllers.createReader);

module.exports = router;
