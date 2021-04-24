const app = require("./app");
const Db = require("./mysql");

let server;
async function startServer() {
  await Db.init();
  server = app.listen(3000, () => {
    console.log("listening on 3000");
  });
}

async function stopServer() {
  await Db.end();
  server.close();
}
process.once("SIGINT", stopServer);
process.once("SIGTERM", stopServer);

startServer().catch((error) => console.log("error.starting.server", error));
