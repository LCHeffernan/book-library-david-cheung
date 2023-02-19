module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title must not be empty" },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Author is required" },
        notEmpty: { msg: "Author must not be empty" },
      },
    },
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define("Book", schema);
  return BookModel;
};
