const { Reader } = require("../models");
const {
  createItem,
  readItem,
  readSingleItem,
  patchItem,
  deleteItem,
} = require("../controllers/helper");

exports.createReader = (req, res) => {
  createItem(Reader, req, res);
};

exports.readReader = (req, res) => {
  readItem(Reader, req, res);
};

exports.readSingleReader = (req, res) => {
  readSingleItem(Reader, req, res);
};

exports.patchReader = (req, res) => {
  patchItem(Reader, req, res);
};

exports.deleteReader = (req, res) => {
  deleteItem(Reader, req, res);
};
