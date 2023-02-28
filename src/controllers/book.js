const { Book } = require("../models"); // model get from ../models/index.js
const helper = require("../controllers/helper");
const { json } = require("body-parser");

exports.createBook = (req, res) => {
  helper.createItem(Book, req, res);
};

exports.readBook = (req, res) => {
  helper.readItem(Book, req, res);
};

exports.searchBook = (req, res) => {
  helper.searchItem(Book, req, res);
};

exports.readSingleBook = (req, res) => {
  helper.getItemById(Book, req, res);
};

exports.patchBook = (req, res) => {
  helper.patchItem(Book, req, res);
};

exports.deleteBook = (req, res) => {
  helper.deleteItem(Book, req, res);
};
