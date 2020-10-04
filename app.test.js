const request = require("supertest");

const { app, closeDb } = require("./app");

let server;

beforeAll((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);
    console.log("init done");
    return done();
  });
});

afterAll(async function (done) {
  await closeDb();
  setTimeout(() => {
    done();
  }, 3000);
});

describe("GET api for block list", () => {
  it("SUCCESS RESULT", async () => {
    request(app)
      .get("/get")
      .end(function (err, response) {
        console.log("--> ", response.body);
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
        // response.done();
        // return response;
        // done();
      });
  });
});
