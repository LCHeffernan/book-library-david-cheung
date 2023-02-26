module.exports = (sequelize, DataTypes) => {
  const schema = {
    author: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      // validate: {
      //   notNull: { args: [true], msg: "Author is required" },
      //   notEmpty: { args: [true], msg: "Author must not be empty" },
      // },
      validate: {
        notNull: {
          args: [true],
          msg: "We need a author in so that we can create one",
        },
        notEmpty: {
          args: [true],
          msg: "We need a author in so that we can create one",
        },
      },
    },
  };

  return sequelize.define("Author", schema);
};
