class Employee {
  constructor(db) {
    this.db = db;
  }

  async load() {
    const sql = "SELECT * FROM employees";
    const rows = await this.db.getRows(sql);
    return rows;
  }
}
module.exports = Employee;
