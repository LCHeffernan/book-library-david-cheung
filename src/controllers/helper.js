async function createItem(item, req, res) {
  const data = req.body;
  try {
    const row = await item.create(data);
    res.status(201).json(row);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
}

async function readItem(item, req, res) {
  try {
    const rows = await item.findAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
}

async function readSingleItem(item, req, res) {
  const { id } = req.params;
  try {
    const row = await item.findByPk(id);
    if (row == null) {
      const ulrArray = req.url.split("/");
      return res
        .status(404)
        .json({ error: `The ${ulrArray[1].slice(0, -1)} could not be found.` });
    }
    res.status(200).json(row);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
}

async function patchItem(item, req, res) {
  const itemId = req.params.id;
  const updateData = req.body;
  try {
    const [rows] = await item.update(updateData, {
      where: { id: itemId },
    });
    if (rows === 0) {
      const ulrArray = req.url.split("/");
      return res
        .status(404)
        .json({ error: `The ${ulrArray[1].slice(0, -1)} could not be found.` });
    }
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
}

async function deleteItem(item, req, res) {
  const itemId = req.params.id;
  try {
    const rows = await item.destroy({ where: { id: itemId } });
    if (rows === 0) {
      const ulrArray = req.url.split("/");
      return res
        .status(404)
        .json({ error: `The ${ulrArray[1].slice(0, -1)} could not be found.` });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json(err.errors[0].message);
  }
}

module.exports = {
  createItem,
  readItem,
  readSingleItem,
  patchItem,
  deleteItem,
};
