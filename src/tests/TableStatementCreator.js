import * as assert from "assert";
import SchemaToSqliteFactory from "../sqlite/statements/TableStatementCreator"
import personSchema from "../testSchemas/person";
import addressSchema from "../testSchemas/address";
import phoneNumberSchema from "../testSchemas/phoneNumber";

exports["SchemaToSqliteFactory: Person Schema."] = () => {
    const schemaToSqliteFactory = new SchemaToSqliteFactory(personSchema);
    const createTableStatement = schemaToSqliteFactory.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "person_0.0.1" ("id" INTEGER, "firstName" TEXT, "lastName" TEXT, "dateOfBirth" INTEGER, PRIMARY KEY("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["SchemaToSqliteFactory: Address Schema."] = () => {
    const schemaToSqliteFactory = new SchemaToSqliteFactory(addressSchema);
    const createTableStatement = schemaToSqliteFactory.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "address_0.0.1" ("id" INTEGER, "address" TEXT, "city" TEXT, "state" INTEGER, "zipCode" INTEGER, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), FOREIGN KEY ("personId") REFERENCES "person_0.0.1" ("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["SchemaToSqliteFactory: Phone Number Schema."] = () => {
    const schemaToSqliteFactory = new SchemaToSqliteFactory(phoneNumberSchema);
    const createTableStatement = schemaToSqliteFactory.createTableStatement();
    const expectedSql = `CREATE TABLE IF NOT EXISTS "phoneNumber_0.0.1" ("id" INTEGER, "type" TEXT, "personId" INTEGER NOT NULL, PRIMARY KEY("id"), UNIQUE ("personId","type"), FOREIGN KEY ("personId") REFERENCES "person_0.0.1" ("id"))`;

    assert.equal(createTableStatement.sql, expectedSql);
};

exports["SchemaToSqliteFactory: Indexes."] = () => {
    const schemaToSqliteFactory = new SchemaToSqliteFactory(addressSchema);
    const indexStatement = schemaToSqliteFactory.createIndexStatements();
    const expectedSql = `CREATE INDEX IF NOT EXIST "address_city" ON "address_0.0.1"("city");CREATE INDEX IF NOT EXIST "address_state" ON "address_0.0.1"("state");`;

    assert.equal(indexStatement, expectedSql);
};