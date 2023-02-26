module.exports = (sequelize, DataTypes) => {
  const schema = {
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      // validate: {
      //   notNull: { args: [true], msg: "Genre is required" },
      //   notEmpty: { args: [true], msg: "Genre must not be empty" },
      // },
      validate: {
        notNull: {
          args: [true],
          msg: "We need a genre in so that we can create one",
        },
        notEmpty: {
          args: [true],
          msg: "We need a genre in so that we can create one",
        },
      },
    },
  };

  return sequelize.define("Genre", schema);
};
