const express = require("express");
const MyDb = require("./db");

async function getEmployee(_req, res) {
  if (!MyDb.initDone) await MyDb.init();
  const mdb = require("./db");
  const employees = await mdb.db.employee.load();
  res.json(employees);
}

const app = express();
app.get("/get", getEmployee);

async function closeDb() {
  console.log("app.closedb.called");
  if (MyDb.close) {
    await MyDb.close();
  }
}
module.exports = { app, closeDb };
