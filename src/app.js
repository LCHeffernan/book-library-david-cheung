const express = require("express");
const app = express();
app.use(express.json());

const readerRouter = require("../src/routes/reader");
app.use(readerRouter);

module.exports = app;
