const { expect } = require("chai");
const request = require("supertest");
const { Reader } = require("../src/models");
const app = require("../src/app");

describe("/readers", () => {
  // before(async () => Reader.sequelize.sync());
  before(async () => await Reader.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /readers", () => {
      it("creates a new reader in the database", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "12345678",
        });
        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal("Elizabeth Bennet");
        expect(response.body.email).to.equal("future_ms_darcy@gmail.com");
        expect(response.body.password).to.be.undefined;

        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(newReaderRecord.name).to.equal("Elizabeth Bennet");
        expect(newReaderRecord.email).to.equal("future_ms_darcy@gmail.com");
        // expect(newReaderRecord.password).to.equal("12345678");
      });

      it("name must be exist", async () => {
        const response = await request(app).post("/readers").send({
          email: "future_ms_darcy@gmail.com",
          password: "12345678",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Name is required");
      });

      it("name must not be empty", async () => {
        const response = await request(app).post("/readers").send({
          name: "",
          email: "future_ms_darcy@gmail.com",
          password: "12345678",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Name must not be empty");
      });

      it("email must be exist", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          password: "12345678",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Email is required");
      });

      it("email must not be empty", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "",
          password: "12345678",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Email must not be empty");
      });

      it("email must be valid format", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcygmail.com",
          password: "12345678",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Email address must be valid");
      });

      it("password must be exist", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Password is required");
      });

      it("password must not be empty", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Password must not be empty");
      });

      it("password must be at least 8 char", async () => {
        const response = await request(app).post("/readers").send({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "1234567",
        });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "Password must be at least 8 charaters long"
        );
      });
    });
  });

  describe("with records in the database", () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: "Elizabeth Bennet",
          email: "future_ms_darcy@gmail.com",
          password: "12345678",
        }),
        Reader.create({
          name: "Arya Stark",
          email: "vmorgul@me.com",
          password: "22222222",
        }),
        Reader.create({
          name: "Lyra Belacqua",
          email: "darknorth123@msn.org",
          password: "33333333",
        }),
      ]);
    });

    describe("GET /readers", () => {
      it("gets all readers records", async () => {
        const response = await request(app).get("/readers");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);
          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
          // expect(reader.password).to.equal(expected.password);
        });
      });
    });

    describe("GET /readers/:id", () => {
      it("gets readers record by id", async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        // expect(response.body.password).to.equal(reader.password);
        expect(response.body.password).to.be.undefined;
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).get("/readers/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });

    describe("PATCH /readers/:id", () => {
      it("updates readers email by id", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: "miss_e_bennet@gmail.com" });

        expect(response.status).to.equal(200);
        expect(response.body.email).to.equal("miss_e_bennet@gmail.com");
        expect(response.body.password).to.be.undefined;

        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });
        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal("miss_e_bennet@gmail.com");
        // expect(updatedReaderRecord.password).to.be.undefined;
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app)
          .patch("/readers/12345")
          .send({ email: "some_new_email@gmail.com" });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });

      it("name must not be empty", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ name: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Name must not be empty");
      });

      it("email must not be empty", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Email must not be empty");
      });

      it("password must not be empty", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ password: "" });
        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Password must not be empty");
      });

      it("updates readers with wrong email format", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: "miss_e_bennetgmail.com" });

        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body).to.equal("Email address must be valid");
      });

      it("updates readers with short password", async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ password: "1234567" });

        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(400);
        expect(response.body).to.equal(
          "Password must be at least 8 charaters long"
        );
      });
    });

    describe("DELETE /readers/:id", () => {
      it("deletes reader record by id", async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      it("returns a 404 if the reader does not exist", async () => {
        const response = await request(app).delete("/readers/12345");
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The reader could not be found.");
      });
    });
  });
});
