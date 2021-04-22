const { initMysqlConn } = require("./mysql-utils");
const Employee = require("./employee");

let db = {};
let initDone = false;
let conn;

// Variable will be available in test mode
const isCITest = !!process.env.CI_JOB_STAGE;
const mySqlHost = isCITest ? "mysql" : "localhost";
console.log("Running in CI ---", mySqlHost);

const databaseName = isCITest ? "test" : "localdb";

const init = async () => {
  conn = await initMysqlConn(
    `mysql://root:root@${mySqlHost}:3306/${databaseName}`,
    "./schema.sql"
  );
  db.employee = new Employee(conn);
  initDone = true;
};

function getClose() {
  return async () => {
    console.log("conn ->> ", conn);
    console.log("in db close");
    if (conn) {
      await conn.close();
    }
  };
}

module.exports = { db, getClose, init, initDone };
