const { app, closeDb } = require("./app");

const server = app.listen(3000, () => {
  console.log("listening on 3000");
});

async function stopServer() {
  await closeDb();
  server.close();
}
process.once("SIGINT", stopServer);
process.once("SIGTERM", stopServer);
