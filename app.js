const express = require("express");
const MyDb = require("./db");

let MySqlDb;
async function getEmployee(_req, res) {
  if (!MyDb.initDone) await MyDb.init();
  if (!MySqlDb) MySqlDb = require("./db");
  const employees = await MySqlDb.employee.load();
  res.json(employees);
}

const app = express();
app.get("/get", getEmployee);

async function closeDb() {
  if (!MySqlDb) MySqlDb = require("./db");
  await MySqlDb.teardown();
}
module.exports = { app, closeDb };
