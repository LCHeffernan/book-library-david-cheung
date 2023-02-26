const { Genre } = require("../models");
const helper = require("../controllers/helper");

exports.createGenre = (req, res) => {
  helper.createItem(Genre, req, res);
};

exports.readGenre = (req, res) => {
  helper.readItem(Genre, req, res);
};

exports.searchGenre = (req, res) => {
  helper.searchItem(Genre, req, res);
};

exports.readSingleGenre = (req, res) => {
  helper.getItemById(Genre, req, res);
};

exports.patchGenre = (req, res) => {
  helper.patchItem(Genre, req, res);
};

exports.deleteGenre = (req, res) => {
  helper.deleteItem(Genre, req, res);
};
