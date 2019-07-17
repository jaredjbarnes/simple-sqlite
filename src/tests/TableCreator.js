import * as assert from "assert";
import TableCreator from "../sqlite/TableCreator"
import sqlite3 from "sqlite3";

const testSchema = {
    "name": "table",
    "label": "Table",
    "description": "Some great description.",
    "columns": [
        {
            "type": "INTEGER",
            "name": "id",
            "label": "Identifier"
        },
        {
            "type": "TEXT",
            "name": "text",
            "label": "Text",
            "description": "Some Description.",
            "isIndexed": true
        },
        {
            "type": "REAL",
            "name": "real",
            "label": "Float",
            "isNullable": false
        },
        {
            "type": "INTEGER",
            "name": "manyToOne",
            "label": "Many To One Identifier",
            "isNullable": false
        },
        {
            "type": "INTEGER",
            "name": "oneToOne",
            "label": "One to One Identifier",
            "isNullable": false
        }
    ],
    primaryKeys: ["id"],
    unique: [
        {
            "columns": ["oneToOne"],
            "conflictOptions": "REPLACE"
        }
    ],
    foreignKeys: {
        "manyToOne": {
            "label": "Source",
            "source": {
                "name": "other_table",
                "label": "Many",
                "column": "id"
            }
        },
        "oneToOne": {
            "label": "Source",
            "source": {
                "name": "other_table",
                "label": "One",
                "column": "id"
            }
        }
    }
};

exports["TableCreator: createTableIfNotExistsAsync."] = async () => {
    const database = new sqlite3.Database(":memory:");
    const tableCreator = new TableCreator({
        schema: testSchema,
        database
    });

    return await tableCreator.createTableIfNotExistsAsync();
}

exports["TableCreator: createTableIfNotExistsAsync twice."] = async () => {
    const database = new sqlite3.Database(":memory:");
    const tableCreator = new TableCreator({
        schema: testSchema,
        database
    });

    await tableCreator.createTableIfNotExistsAsync();
    return await tableCreator.createTableIfNotExistsAsync();
}

exports["TableCreator: createTableIfNotExistsAsync then Drop"] = async () => {
    const database = new sqlite3.Database(":memory:");
    const tableCreator = new TableCreator({
        schema: testSchema,
        database
    });

    await tableCreator.createTableIfNotExistsAsync();
    return await tableCreator.dropTableIfExistsAsync();
}