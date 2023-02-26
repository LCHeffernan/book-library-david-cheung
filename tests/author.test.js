const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const app = require("../src/app");

describe("/authors", () => {
  before(async () => await Author.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          author: "author001",
        });
        expect(response.status).to.equal(201);

        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.body.author).to.equal("author001");
        expect(newAuthorRecord.author).to.equal("author001");
      });

      it("author must be unique", async () => {
        await request(app).post("/authors").send({
          author: "author999",
        });
        const response = await request(app).post("/authors").send({
          author: "author999",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("author must be unique");
      });

      it("author must not be empty", async () => {
        const response = await request(app).post("/authors").send({
          AuthorId: "",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "We need a author in so that we can create one"
        );
      });

      // ========================
      // test unique value
      // ========================
    });
  });

  describe("with records in the database", () => {
    let authors;

    beforeEach(async () => {
      authors = await Promise.all([
        Author.create({
          author: "author001",
        }),
        Author.create({
          author: "author002",
        }),
        Author.create({
          author: "author003",
        }),
        Author.create({
          author: "author004",
        }),
        Author.create({
          author: "author005",
        }),
      ]);
    });

    describe("GET /authors", () => {
      it("gets all authors records", async () => {
        const response = await request(app).get("/authors");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(5);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);
          expect(author.author).to.equal(expected.author);
        });
      });
    });

    describe("POST /authors/search", () => {
      it("gets all authors records with selection", async () => {
        const response = await request(app)
          .post("/authors/search")
          .send({ author: "author002" });

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);
      });
    });

    describe("GET /authors/:id", () => {
      it("gets authors record by id", async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal(author.author);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).get("/authors/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });
    });

    describe("PATCH /authors/:id", () => {
      it("updates authors genre by id", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: "author9999" });

        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal("author9999");
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app)
          .patch("/authors/12345")
          .send({ author: "author9999" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });

      it("author must not be empty", async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({ author: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "We need a author in so that we can create one"
        );
      });
    });

    describe("DELETE /authors/:id", () => {
      it("deletes author record by id", async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it("returns a 404 if the author does not exist", async () => {
        const response = await request(app).delete("/authors/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The author could not be found.");
      });
    });
  });
});
