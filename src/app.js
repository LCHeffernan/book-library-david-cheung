const express = require("express");

const app = express();

app.use(express.json());

const readerRouter = require("../src/routes/reader");
const bookRouter = require("../src/routes/book");
const authorRouter = require("../src/routes/author");
const genreRouter = require("../src/routes/genre");

app.use(readerRouter);
app.use(bookRouter);
app.use(authorRouter);
app.use(genreRouter);

module.exports = app;
