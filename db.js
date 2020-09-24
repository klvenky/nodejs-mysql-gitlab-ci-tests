const { initMysqlConn } = require("./mysql-utils");
const Employee = require("./employee");

let db = {};
let close;
let initDone = false;

// Variable will be available in test mode
const isCITest = !!process.env.CI_JOB_STAGE;
console.log("Running in CI ---", isCITest);
const init = async () => {
  conn = await initMysqlConn(
    `mysql://root:root@${isCITest ? "mysql" : "localhost"}:3306/test_database`,
    "./schema.sql"
  );
  db.employee = new Employee(conn);
  close = async () => {
    await conn.close();
  };
  initDone = true;
};

module.exports = { db, close, init, initDone };
