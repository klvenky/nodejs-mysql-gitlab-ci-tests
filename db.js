// all the database initialization happens here.
const schema = `
  CREATE TABLE IF NOT EXISTS employees(
    id VARCHAR(4) PRIMARY KEY,
    name VARCHAR(20)
  )
`;
const insertQuery = `
  INSERT INTO employees(id, name)
  VALUES("1", "Sample")
  VALUES("2", "Example")
  VALUES("3", "Test")
  VALUES("4", "Project")
`;
// Connect to the database which runs on localhost in CI mode
// Run the above two queries to insert dummy data at test run time.
// Query this table
// mysql://root@localhost:3306/ccart
