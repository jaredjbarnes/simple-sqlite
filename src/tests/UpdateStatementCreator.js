import * as assert from "assert";
import UpdateStatementCreator from "../sqlite/statements/UpdateStatementCreator";
import personSchema from "../testSchemas/person";

exports["UpdateStatementCreator: createStatement."] = () => {
    const entity = {
        id: 1,
        firstName: "John"
    };
    const tableName = personSchema.name;
    const primaryKeys = personSchema.primaryKeys;
    const updateStatementCreator = new UpdateStatementCreator({
        entity,
        tableName,
        primaryKeys
    });
    const { sql, values } = updateStatementCreator.createStatement();
    const expected = `UPDATE "person" SET "firstName" = ? WHERE "id" = 1`;
    
    assert.equal(values[0], "John");
    assert.equal(sql, expected);
    assert.equal(values[0], "John");
    assert.equal(values.length, 1);
}