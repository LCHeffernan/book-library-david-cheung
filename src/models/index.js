const Sequelize = require("sequelize");
const ReaderModel = require("./reader");
const BookModel = require("./book");
const AuthorModel = require("./author");
const GenreModel = require("./genre");

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: "postgres",
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);

  Book.belongsTo(Author, {
    // as: "author",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an author" },
        notEmpty: { msg: "This Book must have an author" },
      },
    },
  }); // auto create new field AuthorId in Book table
  Author.hasMany(Book);

  Book.belongsTo(Genre, {
    // as: "genre",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an genre" },
        notEmpty: { msg: "This Book must have an genre" },
      },
    },
  });
  Genre.hasMany(Book);

  connection.sync({ alter: true }); // not recommended for production-level software

  return {
    Reader,
    Book,
    Author,
    Genre,
  };
};

module.exports = setupDatabase();
