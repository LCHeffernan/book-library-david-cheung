module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name must not be empty" },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email must not be empty" },
        isEmail: {
          msg: "Email address must be valid",
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password must not be empty" },
        len: {
          args: [8, 40],
          msg: "Password must be at least 8 charaters long",
        },
      },
    },
  };

  return sequelize.define("Reader", schema);
};
