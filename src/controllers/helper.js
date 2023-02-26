exports.createItem = async (model, req, res) => {
  try {
    const row = await model.create(req.body);
    const { password, ...rest } = row.toJSON();
    return res.status(201).json(rest);
  } catch (err) {
    // how to custom foreign key error message ?
    res.status(400).json(err.errors[0].message);
  }
};

exports.readItem = async (model, req, res) => {
  let rows;
  try {
    if (model.name === "Book") {
      // rows = await model.findAll({ include: ["Author", "Genre"] });
      rows = await model.findAll();
    } else {
      rows = await model.findAll({
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
};

exports.getItemById = async (model, req, res) => {
  let row;
  const tableName = model.name.toLowerCase();
  try {
    if (model.name === "Book") {
      row = await model.findByPk(req.params.id, {
        include: ["Author", "Genre"],
      });
    } else {
      row = await model.findByPk(req.params.id, {
        modelName: "Reader",
        attributes: { exclude: "password" },
      });
    }
    if (row == null) {
      return res
        .status(404)
        .json({ error: `The ${tableName} could not be found.` });
    }
    return res.status(200).json(row);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
};

exports.patchItem = async (model, req, res) => {
  const tableName = model.name.toLowerCase();
  await model
    .update(req.body, { where: { id: req.params.id }, returning: true })
    .then((rows) => {
      if (rows[0] === 0) {
        return res
          .status(404)
          .json({ error: `The ${tableName} could not be found.` });
      }
      const { password, ...rest } = rows[1][0].toJSON();
      res.status(200).json(rest);
    })
    .catch((err) => res.status(400).json(err.errors[0].message));
};

exports.deleteItem = async (model, req, res) => {
  const tableName = model.name.toLowerCase();
  await model
    .destroy({ where: { id: req.params.id } })
    .then((rows) => {
      if (rows === 0) {
        return res
          .status(404)
          .json({ error: `The ${tableName} could not be found.` });
      }
      res.sendStatus(204);
    })
    .catch((err) => res.status(400).json(err.errors[0].message));
};
