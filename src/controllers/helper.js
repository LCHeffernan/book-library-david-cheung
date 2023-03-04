exports.createItem = async (model, req, res) => {
  try {
    const row = await model.create(req.body);
    const { password, ...rest } = row.toJSON();
    return res.status(201).json(rest);
  } catch (err) {
    if (err.errors) {
      res.status(400).json(err.errors[0].message);
    } else if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json(err.parent.detail);
    } else {
      res.status(400).json(err.name);
    }
  }
};

exports.readItem = async (model, req, res) => {
  let rows;
  try {
    if (model.name === "Book") {
      rows = await model.findAll({ include: ["author", "genre"] });
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

exports.searchItem = async (model, req, res) => {
  try {
    const rows = await model.findAll({ where: req.body });
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
        include: ["author", "genre"],
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

  try {
    const rows = await model.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (rows[0] === 0) {
      return res
        .status(404)
        .json({ error: `The ${tableName} could not be found.` });
    }
    const { password, ...rest } = rows[1][0].toJSON();
    res.status(200).json(rest);
  } catch (err) {
    if (err.errors) {
      res.status(400).json(err.errors[0].message);
    } else if (err.name === "SequelizeForeignKeyConstraintError") {
      res.status(400).json(err.parent.detail);
    } else {
      res.status(400).json(err.name);
    }
  }
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
