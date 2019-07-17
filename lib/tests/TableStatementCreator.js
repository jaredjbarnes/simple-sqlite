"use strict";

var assert = _interopRequireWildcard(require("assert"));

var _TableStatementCreator = _interopRequireDefault(require("../sqlite/statements/TableStatementCreator"));

var _person = _interopRequireDefault(require("../testSchemas/person"));

var _address = _interopRequireDefault(require("../testSchemas/address"));

var _phoneNumber = _interopRequireDefault(require("../testSchemas/phoneNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

exports["TableStatementCreator: Person Schema."] = () => {
  const tableStatementCreator = new _TableStatementCreator.default(_person.default);
  const createTableStatement = tableStatementCreator.createTableStatement();
  const expectedSql = `CREATE TABLE IF NOT EXISTS "person" ("id" INTEGER, "firstName" TEXT, "lastName" TEXT, "dateOfBirth" INTEGER, PRIMARY KEY("id"))`;
  assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Address Schema."] = () => {
  const tableStatementCreator = new _TableStatementCreator.default(_address.default);
  const createTableStatement = tableStatementCreator.createTableStatement();
  const expectedSql = `CREATE TABLE IF NOT EXISTS "address" ("id" INTEGER, "address" TEXT, "city" TEXT, "state" INTEGER, "zipCode" INTEGER, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), FOREIGN KEY ("personId") REFERENCES "person" ("id"))`;
  assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Phone Number Schema."] = () => {
  const tableStatementCreator = new _TableStatementCreator.default(_phoneNumber.default);
  const createTableStatement = tableStatementCreator.createTableStatement();
  const expectedSql = `CREATE TABLE IF NOT EXISTS "phoneNumber" ("id" INTEGER, "type" TEXT, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), UNIQUE ("personId","type"), FOREIGN KEY ("personId") REFERENCES "person" ("id"))`;
  assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Indexes."] = () => {
  const tableStatementCreator = new _TableStatementCreator.default(_address.default);
  const indexStatement = tableStatementCreator.createIndexStatements();
  const expectedSql = `CREATE INDEX IF NOT EXIST "address_city" ON "address" ("city");CREATE INDEX IF NOT EXIST "address_state" ON "address" ("state");`;
  assert.equal(indexStatement, expectedSql);
};
//# sourceMappingURL=TableStatementCreator.js.map