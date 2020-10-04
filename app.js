const express = require("express");
const MyDb = require("./db");

let mdb;
async function getEmployee(_req, res) {
  if (!MyDb.initDone) await MyDb.init();
  if (!mdb) mdb = require("./db");
  const employees = await mdb.db.employee.load();
  res.json(employees);
}

const app = express();
app.get("/get", getEmployee);

async function closeDb() {
  console.log("app.closedb.called");

  if (!mdb) mdb = require("./db");
  else console.log("---", mdb);

  const closeFunc = mdb.getClose();
  console.log("got close function -> ", closeFunc);
  await closeFunc();
}
module.exports = { app, closeDb };
