const InitMysqlConn = require("./mysql-utils");
const Employee = require("./employee");

// Variable will be available in test mode
const isCITest = !!process.env.CI_JOB_STAGE;
const mySqlHost = isCITest ? "mysql" : "localhost";
if (isCITest) {
  console.log("Running in CI ---", mySqlHost);
}

const databaseName = isCITest ? "test" : "localdb";
const connectionUrl = `mysql://root:root@${mySqlHost}:3306/${databaseName}`;

class Db {
  static connection;
  static employee;
  static async init() {
    Db.connection = await InitMysqlConn(connectionUrl, "./schema.sql");
    Db.employee = new Employee(Db.connection);
  }
  static async end() {
    await Db.connection.closeConnection();
    // Db.connection = null;
    // Db.employee = null;
  }
}

module.exports = Db;
