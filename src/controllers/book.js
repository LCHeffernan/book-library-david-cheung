const { Book } = require("../models");
const {
  createItem,
  readItem,
  readSingleItem,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createBook = (req, res) => {
  createItem(Book, req, res);
};

exports.readBook = (req, res) => {
  readItem(Book, req, res);
};

exports.readSingleBook = (req, res) => {
  readSingleItem(Book, req, res);
};

exports.patchBook = (req, res) => {
  patchItem(Book, req, res);
};

exports.deleteBook = (req, res) => {
  deleteItem(Book, req, res);
};
