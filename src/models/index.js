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

  // setup models
  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);

  Book.belongsTo(Author, {
    as: "author", //  alias to model, so authorId will be created
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an author" },
        notEmpty: { msg: "This Book must have an author" },
      },
    },
  });
  // Author.hasMany(Book); << it will create foreign key AuthorId, please don't add it

  Book.belongsTo(Genre, {
    as: "genre",
    foreignKey: {
      allowNull: false,
      validate: {
        notNull: { msg: "This Book must have an genre" },
        notEmpty: { msg: "This Book must have an genre" },
      },
    },
  });
  // Genre.hasMany(Book);  << it will create foreign key GenreId, please don't add it

  // force models' schema sync to database
  // not recommended for production-level software
  connection.sync({ alter: true });

  return {
    Reader,
    Book,
    Author,
    Genre,
  };
};

// return model will be used in controllers
module.exports = setupDatabase();
