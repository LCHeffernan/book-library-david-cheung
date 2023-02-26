const { Author } = require("../models");
const helper = require("../controllers/helper");

exports.createAuthor = (req, res) => {
  helper.createItem(Author, req, res);
};

exports.readAuthor = (req, res) => {
  helper.readItem(Author, req, res);
};

exports.searchAuthor = async (req, res) => {
  try {
    const rows = await Author.findAll({ where: req.body });
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
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
