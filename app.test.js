const request = require("supertest");

const { app, closeDb } = require("./app");

let server;

beforeAll((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);
    console.log('init done');
    return done();
  });
});

afterAll(async function (done) {
  await closeDb();
  return done();
});

describe("GET api for block list", () => {
  test("SUCCESS RESULT", async () => {
    const response = await request(app).get(`/get`).send();
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    // expect(response.body).toHaveProperty("count");
    // expect(response.body).toHaveProperty("rows");
  });
});
