const express = require("express");
const app = express();
app.use(express.json());

const readerRouter = require("../src/routes/reader");
const bookRouter = require("../src/routes/book");

app.use(readerRouter);
app.use(bookRouter);

module.exports = app;
