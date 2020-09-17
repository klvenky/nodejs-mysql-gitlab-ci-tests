function add(a, b) {
  return a + b;
}

describe("Unit Tests run", function () {
  beforeAll(function () {
    // initialize the server & db here
    console.log("in before all");
  });
  afterAll(function () {
    // close the app server & db here
    console.log("in after all");
  });
  test("sample test", function () {
    expect(add(1, 2)).toEqual(3);
  });
});
