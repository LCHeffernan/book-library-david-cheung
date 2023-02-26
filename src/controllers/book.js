const { Book } = require("../models");
const helper = require("../controllers/helper");
const { json } = require("body-parser");

exports.createBook = (req, res) => {
  helper.createItem(Book, req, res);
};

exports.readBook = (req, res) => {
  helper.readItem(Book, req, res);
};

exports.searchBook = async (req, res) => {
  try {
    const rows = await Book.findAll({ where: req.body });
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
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
