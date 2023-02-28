const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  let author;
  let genre;

  before(async () => {
    await Book.sequelize.sync({ force: true });
    author = await request(app).post("/authors").send({ author: "author001" });
    author = await request(app).post("/authors").send({ author: "author002" });
    author = await request(app).post("/authors").send({ author: "author003" });
    author = await request(app).post("/authors").send({ author: "author004" });
    author = await request(app).post("/authors").send({ author: "author005" });
    author = await request(app).post("/authors").send({ author: "author006" });
    author = await request(app).post("/authors").send({ author: "author007" });
    author = await request(app).post("/authors").send({ author: "author008" });
    author = await request(app).post("/authors").send({ author: "author009" });
    author = await request(app).post("/authors").send({ author: "author010" });

    genre = await request(app).post("/genres").send({ genre: "genre001" });
    genre = await request(app).post("/genres").send({ genre: "genre002" });
    genre = await request(app).post("/genres").send({ genre: "genre003" });
    genre = await request(app).post("/genres").send({ genre: "genre004" });
    genre = await request(app).post("/genres").send({ genre: "genre005" });
    genre = await request(app).post("/genres").send({ genre: "genre006" });
    genre = await request(app).post("/genres").send({ genre: "genre007" });
    genre = await request(app).post("/genres").send({ genre: "genre008" });
    genre = await request(app).post("/genres").send({ genre: "genre009" });
    genre = await request(app).post("/genres").send({ genre: "genre010" });
  });

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "title001",
          ISBN: "isbn001",
          authorId: author.body.id,
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(201);

        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.body.title).to.equal("title001");
        expect(newBookRecord.title).to.equal("title001");
        expect(newBookRecord.authorId).to.equal(author.body.id);
        expect(newBookRecord.genreId).to.equal(genre.body.id);
        expect(newBookRecord.ISBN).to.equal("isbn001");
      });

      it("title must be exist", async () => {
        const response = await request(app).post("/books").send({
          ISBN: "isbn001",
          authorId: author.body.id,
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("We need a book title");
      });

      it("title must not be empty", async () => {
        const response = await request(app).post("/books").send({
          title: "",
          ISBN: "isbn001",
          authorId: author.body.id,
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("The book title cannot be empty");
      });

      it("authorId must be exist", async () => {
        const response = await request(app).post("/books").send({
          title: "title001",
          ISBN: "isbn001",
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("This Book must have an author");
      });

      it("authorId must not be empty", async () => {
        const response = await request(app).post("/books").send({
          title: "title001",
          ISBN: "isbn001",
          authorId: "",
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("This Book must have an author");
      });

      it("authorId must be existed in Authors table", async () => {
        const response = await request(app).post("/books").send({
          title: "title001",
          ISBN: "isbn001",
          authorId: 999,
          genreId: genre.body.id,
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          'Key (authorId)=(999) is not present in table "Authors".'
        );
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "title001",
          authorId: 1,
          genreId: 1,
          ISBN: "isbn001",
        }),
        Book.create({
          title: "title002",
          authorId: 2,
          genreId: 2,
          ISBN: "isbn002",
        }),
        Book.create({
          title: "title006",
          authorId: 2,
          genreId: 3,
          ISBN: "isbn006",
        }),
        Book.create({
          title: "title003",
          authorId: 3,
          genreId: 3,
          ISBN: "isbn003",
        }),
        Book.create({
          title: "title004",
          authorId: 4,
          genreId: 3,
          ISBN: "isbn004",
        }),
        Book.create({
          title: "title005",
          authorId: 5,
          genreId: 3,
          ISBN: "isbn005",
        }),
      ]);
    });

    describe("GET /books", () => {
      it("gets all books records", async () => {
        const response = await request(app).get("/books");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(6);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);
          expect(book.title).to.equal(expected.title);
          expect(book.authorId).to.equal(expected.authorId);
          expect(book.genreId).to.equal(expected.genreId);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("POST /books/search", () => {
      it("gets all books records with selection", async () => {
        const response = await request(app)
          .post("/books/search")
          .send({ authorId: 2 });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);
      });
    });

    describe("POST /books/search", () => {
      it("gets all books records with selection", async () => {
        const response = await request(app)
          .post("/books/search")
          .send({ genreId: 3 });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(4);
      });
    });

    describe("POST /books/search", () => {
      it("gets all books records with selection", async () => {
        const response = await request(app)
          .post("/books/search")
          .send({ authorId: 4, genreId: 3 });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe("GET /books/:id", () => {
      it("gets books record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.authorId).to.equal(book.authorId);
        expect(response.body.genreId).to.equal(book.genreId);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).get("/books/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });

    describe("PATCH /books/:id", () => {
      it("updates books genre by id", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ genreId: 2 });

        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.genreId).to.equal(2);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app)
          .patch("/books/12345")
          .send({ genreId: 2 });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });

      it("title must not be empty", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ title: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("The book title cannot be empty");
      });

      it("authorId must not be empty", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ authorId: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("This Book must have an author");
      });

      it("authorId must be existed in Authors table", async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ authorId: 999 });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          'Key (authorId)=(999) is not present in table "Authors".'
        );
      });
    });

    describe("DELETE /books/:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/books/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
