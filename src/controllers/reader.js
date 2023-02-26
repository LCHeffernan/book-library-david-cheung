const { Reader } = require("../models");
const helper = require("../controllers/helper");

exports.createReader = (req, res) => {
  helper.createItem(Reader, req, res);
};

exports.readReader = (req, res) => {
  helper.readItem(Reader, req, res);
};

exports.readSingleReader = (req, res) => {
  helper.getItemById(Reader, req, res);
};

exports.patchReader = (req, res) => {
  helper.patchItem(Reader, req, res);
};

exports.deleteReader = (req, res) => {
  helper.deleteItem(Reader, req, res);
};
