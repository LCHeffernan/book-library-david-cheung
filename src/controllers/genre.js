const { Genre } = require("../models");
const helper = require("../controllers/helper");

exports.createGenre = (req, res) => {
  helper.createItem(Genre, req, res);
};

exports.readGenre = (req, res) => {
  helper.readItem(Genre, req, res);
};

exports.searchGenre = async (req, res) => {
  try {
    const rows = await Genre.findAll({ where: req.body });
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
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
