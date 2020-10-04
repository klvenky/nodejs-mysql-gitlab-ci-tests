const { initMysqlConn } = require("./mysql-utils");
const Employee = require("./employee");

let db = {};
let initDone = false;

// Variable will be available in test mode
const isCITest = !!process.env.CI_JOB_STAGE;
const mySqlHost = isCITest ? "mysql" : "localhost";
console.log("Running in CI ---", mySqlHost);

const init = async () => {
  conn = await initMysqlConn(
    `mysql://root:root@${mySqlHost}:3306/test_database`,
    "./schema.sql"
  );
  db.employee = new Employee(conn);
  initDone = true;
};

function getClose() {
  return async () => {
    console.log("in db close");
    await conn.close();
    console.log("close done");
  };
}

module.exports = { db, getClose, init, initDone };
