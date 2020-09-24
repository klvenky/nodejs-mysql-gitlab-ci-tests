CREATE TABLE IF NOT EXISTS employees(
  id VARCHAR(4) PRIMARY KEY,
  name VARCHAR(20)
);
DELETE FROM employees;
INSERT INTO employees(id, name)
VALUES("1", "Sample"),
("2", "Example"),
("3", "Test"),
("4", "Project");
