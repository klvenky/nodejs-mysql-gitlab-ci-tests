const { app, closeDb } = require("./app");

app.listen(3000, () => {
  console.log("listening on 3000");
});

process.once("SIGINT", closeDb);
process.once("SIGTERM", closeDb);
