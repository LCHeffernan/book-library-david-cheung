const { Reader } = require("../models");

exports.createReader = async (req, res) => {
  Reader.create(req.body).then((reader) => res.status(201).json(reader));
};
