module.exports = (sequelize, DataTypes) => {
  const schema = {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: [true],
          msg: "We need a book title",
        },
        notEmpty: {
          args: [true],
          msg: "The book title cannot be empty",
        },
      },
    },
    ISBN: DataTypes.STRING,
  };

  return sequelize.define("Book", schema);
};
