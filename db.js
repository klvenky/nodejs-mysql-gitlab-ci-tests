const { initMysqlConn } = require("./mysql-utils");
const Employee = require("./employee");

let db = {};
let close;
let initDone = false;

const init = async () => {
  conn = await initMysqlConn(
    "mysql://root:root@localhost:3306/test_database",
    "./schema.sql"
  );
  db.employee = new Employee(conn);
  close = async () => {
    await conn.close();
  };
  initDone = true;
};

module.exports = { db, close, init, initDone };
