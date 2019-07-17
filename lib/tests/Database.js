"use strict";

var assert = _interopRequireWildcard(require("assert"));

var _Database = _interopRequireDefault(require("../sqlite/Database"));

var _sqlite = _interopRequireDefault(require("sqlite3"));

var _person = _interopRequireDefault(require("../testSchemas/person"));

var _address = _interopRequireDefault(require("../testSchemas/address"));

var _phoneNumber = _interopRequireDefault(require("../testSchemas/phoneNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

exports["Database: Add Schemas."] = async () => {
  const database = new _Database.default({
    database: new _sqlite.default.Database(":memory:")
  });
  database.addSchema(_person.default);
  database.addSchema(_address.default);
  database.addSchema(_phoneNumber.default);
};

exports["Database: Add Person."] = async () => {
  const database = new _Database.default({
    database: new _sqlite.default.Database(":memory:")
  });
  database.addSchema(_person.default);
  await database.createTablesFromSchemasAsync();
  return await database.getTable(_person.default.name).addAsync({
    firstName: "John",
    lastName: "Doe"
  });
};
//# sourceMappingURL=Database.js.map