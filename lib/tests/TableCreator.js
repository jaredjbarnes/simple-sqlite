"use strict";

var assert = _interopRequireWildcard(require("assert"));

var _TableCreator = _interopRequireDefault(require("../sqlite/TableCreator"));

var _sqlite = _interopRequireDefault(require("sqlite3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const testSchema = {
  "name": "table",
  "label": "Table",
  "description": "Some great description.",
  "version": "1.0.1",
  "columns": [{
    "type": "INTEGER",
    "name": "id",
    "label": "Identifier"
  }, {
    "type": "TEXT",
    "name": "text",
    "label": "Text",
    "description": "Some Description.",
    "isIndexed": true
  }, {
    "type": "REAL",
    "name": "real",
    "label": "Float",
    "isNullable": false
  }, {
    "type": "INTEGER",
    "name": "manyToOne",
    "label": "Many To One Identifier",
    "isNullable": false
  }, {
    "type": "INTEGER",
    "name": "oneToOne",
    "label": "One to One Identifier",
    "isNullable": false
  }],
  primaryKeys: ["id"],
  foreignKeys: {
    "manyToOne": {
      "label": "Source",
      "source": {
        "name": "other_table",
        "version": "1.0.0",
        "label": "Many",
        "column": "id"
      }
    },
    "oneToOne": {
      "label": "Source",
      "source": {
        "name": "other_table",
        "version": "1.0.0",
        "label": "One",
        "column": "id"
      }
    }
  }
};

exports["TableCreator: createTableIfNotExistsAsync."] = async () => {
  const database = new _sqlite.default.Database(":memory:");
  const tableCreator = new _TableCreator.default({
    schema: testSchema,
    database
  });
  return await tableCreator.createTableIfNotExistsAsync();
};

exports["TableCreator: createTableIfNotExistsAsync twice."] = async () => {
  const database = new _sqlite.default.Database(":memory:");
  const tableCreator = new _TableCreator.default({
    schema: testSchema,
    database
  });
  await tableCreator.createTableIfNotExistsAsync();
  return await tableCreator.createTableIfNotExistsAsync();
};

exports["TableCreator: createTableIfNotExistsAsync then Drop"] = async () => {
  const database = new _sqlite.default.Database(":memory:");
  const tableCreator = new _TableCreator.default({
    schema: testSchema,
    database
  });
  await tableCreator.createTableIfNotExistsAsync();
  return await tableCreator.dropTableIfExistsAsync();
};
//# sourceMappingURL=TableCreator.js.map