const express = require("express");
const MyDb = require("./mysql");

async function getEmployee(_req, res) {
  const employees = await MyDb.employee.load();
  res.json(employees);
}

const app = express();
app.get("/get", getEmployee);

module.exports = app
