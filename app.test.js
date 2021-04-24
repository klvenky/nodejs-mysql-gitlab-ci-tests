const request = require("supertest");

const app= require("./app");
const Db = require("./mysql");

let server;

beforeAll(async (done) => {
  await Db.init();
  server = app.listen(4000, (err) => {
    if (err) return done(err);
    return done();
  });
});

afterAll(async function (done) {
  await Db.end().then(() => {
    server.close((e) => {
      done(e);
    });
  });
});

describe("GET api for block list", () => {
  it("SUCCESS RESULT", async (done) => {
    request(app)
      .get("/get")
      .end(function (err, response) {
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
        done();
      });
  });
});
