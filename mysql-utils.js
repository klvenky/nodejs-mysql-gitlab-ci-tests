const fs = require("fs");
const mysql = require("mysql");
const querystring = require("querystring");
const urlm = require("url");
const util = require("util");

const readFile = util.promisify(fs.readFile);

async function singleQuery(connStr, sql) {
  const conn = mysql.createConnection(connStr);
  const queryPr = util.promisify(conn.query).bind(conn);
  const endPr = util.promisify(conn.end).bind(conn);
  await queryPr(sql);
  await endPr();
}

async function createDatabase(connStr) {
  const url = urlm.parse(connStr);
  const dbName = (url.pathname || "").substr(1);
  url.pathname = "/";
  await singleQuery(
    urlm.format(url),
    `CREATE DATABASE IF NOT EXISTS ${dbName}`
  );
}

async function constSQL(connStr, schemaFile) {
  const schemaSQL = await readFile(schemaFile, "utf-8");
  const purl = urlm.parse(connStr, true);
  purl.search = querystring.stringify({
    ...purl.query,
    multipleStatements: true,
  });
  await singleQuery(urlm.format(purl), schemaSQL);
}

const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (chars) => chars[1].toUpperCase());

// fixRows, does two things
// change underscore to camelcase
// parse json str to json object
function fixRows(rows, fields) {
  const modFields = fields.map((f) => ({ ...f, modName: toCamelCase(f.name) }));
  return rows.map((row) => {
    const modRow = {};
    for (const f of modFields) {
      const val = row[f.name];
      modRow[f.modName] = f.type === 245 && val ? JSON.parse(val) : val;
    }
    return modRow;
  });
}

const cleanSQL = (sql) => sql.replace(/[\s\n]+/g, " ").trim();

// default mysql node js client charset is UTF8_GENERAL_CI, which doesn't support
// special unicode characters, so add utf8mb4 charset to the connection string
function addCharset(connStr) {
  const url = urlm.parse(connStr, true);
  url.search = querystring.stringify({ ...url.query, charset: "utf8mb4" });
  return urlm.format(url);
}

async function initMysqlConn(connStr, schemaFile) {
  const modConnStr = addCharset(connStr);
  await createDatabase(modConnStr);
  if (schemaFile) await constSQL(modConnStr, schemaFile);
  const myPool = mysql.createPool(modConnStr);
  const queryPr = (sql, params = []) => {
    // console.log(`SQL: ${cleanSQL(sql)}`, { params });
    return new Promise((resolve, reject) => {
      myPool.query(sql, params, (error, rowsOrResult, fields) => {
        if (error) reject(error);
        else if (Array.isArray(rowsOrResult))
          resolve(fixRows(rowsOrResult, fields));
        else resolve(rowsOrResult);
      });
    });
  };
  const query = (sql, params) => queryPr(sql, params);
  const getRows = (sql, params) => queryPr(sql, params);
  const close = async () => {
    console.log("closing conn");
    console.log("---", myPool.end);
    await myPool.end();
  };
  return {
    query,
    getRows,
    close,
  };
}
module.exports = { initMysqlConn };
