"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sqlite3Wrapper = _interopRequireDefault(require("./Sqlite3Wrapper"));

var _TableCreator = _interopRequireDefault(require("./TableCreator"));

var _Table = _interopRequireDefault(require("./Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
  constructor({
    database,
    schemas
  }) {
    this.database = database;
    this.schemas = Array.isArray(schemas) ? schemas : [];
  }

  hasSchemaWithName(name) {
    return this.getSchemaByName(name) != null;
  }

  getSchemaByName(name) {
    return this.schemas.find(innerSchema => {
      return name == innerSchema.name;
    });
  }

  removeSchemaByName(name) {
    const index = this.schemas.findIndex(() => {
      return name == innerSchema;
    });

    if (index > -1) {
      this.schemas.splice(index, 1);
    }
  }

  getSchemas() {
    return this.schemas.slice(0);
  }

  addSchema(schema) {
    this.schemas.push(schema);
  }

  removeSchema(schema) {
    this.removeSchemaByName(schema.name);
  }

  async createTableFromSchemaAsync(schema) {
    return await _TableCreator.default.createTableIfNotExistsAsync({
      database: this.database,
      schema
    });
  }

  async createTablesFromSchemasAsync() {
    return await this.schemas.reduce((promise, schema) => {
      return promise.then(() => {
        return this.createTableFromSchemaAsync(schema);
      });
    }, Promise.resolve());
  }

  async dropTableFromSchemaAsync(schema) {
    return await _TableCreator.default.dropTableIfExistsAsync({
      database: this.database,
      schema
    });
  }

  getTable(name, lifeCycleDelegate) {
    const schema = this.getSchemaByName(name);

    if (schema == null) {
      throw new Error("Unable to find table.");
    }

    const database = this.database;
    return new _Table.default({
      database: database,
      schema,
      lifeCycleDelegate
    });
  }

}

exports.default = Database;
//# sourceMappingURL=Database.js.map