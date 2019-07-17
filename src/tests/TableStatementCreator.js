import * as assert from "assert";
import TableStatementCreator from "../sqlite/statements/TableStatementCreator"
import personSchema from "../testSchemas/person";
import addressSchema from "../testSchemas/address";
import phoneNumberSchema from "../testSchemas/phoneNumber";

exports["TableStatementCreator: Person Schema."] = () => {
    const tableStatementCreator = new TableStatementCreator(personSchema);
    const createTableStatement = tableStatementCreator.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "person" ("id" INTEGER, "firstName" TEXT, "lastName" TEXT, "dateOfBirth" INTEGER, PRIMARY KEY("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Address Schema."] = () => {
    const tableStatementCreator = new TableStatementCreator(addressSchema);
    const createTableStatement = tableStatementCreator.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "address" ("id" INTEGER, "address" TEXT, "city" TEXT, "state" INTEGER, "zipCode" INTEGER, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), FOREIGN KEY ("personId") REFERENCES "person" ("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Phone Number Schema."] = () => {
    const tableStatementCreator = new TableStatementCreator(phoneNumberSchema);
    const createTableStatement = tableStatementCreator.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "phoneNumber" ("id" INTEGER, "type" TEXT, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), UNIQUE ("personId","type"), FOREIGN KEY ("personId") REFERENCES "person" ("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["TableStatementCreator: Indexes."] = () => {
    const tableStatementCreator = new TableStatementCreator(addressSchema);
    const indexStatement = tableStatementCreator.createIndexStatements();
    const expectedSql = `CREATE INDEX IF NOT EXIST "address_city" ON "address" ("city");CREATE INDEX IF NOT EXIST "address_state" ON "address" ("state");`;

    assert.equal(indexStatement, expectedSql);
};