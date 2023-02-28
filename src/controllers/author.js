const { Author } = require("../models"); // model get from ../models/index.js
const helper = require("../controllers/helper");

exports.createAuthor = (req, res) => {
  helper.createItem(Author, req, res);
};

exports.readAuthor = (req, res) => {
  helper.readItem(Author, req, res);
};

exports.searchAuthor = (req, res) => {
  helper.searchItem(Author, req, res);
};

exports.readSingleAuthor = (req, res) => {
  helper.getItemById(Author, req, res);
};

exports.patchAuthor = (req, res) => {
  helper.patchItem(Author, req, res);
};

exports.deleteAuthor = (req, res) => {
  helper.deleteItem(Author, req, res);
};
