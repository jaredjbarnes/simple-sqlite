"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Sqlite3Wrapper = _interopRequireDefault(require("./Sqlite3Wrapper"));

var _TableStatementCreator = _interopRequireDefault(require("./statements/TableStatementCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TableCreator {
  constructor({
    database,
    schema
  }) {
    this.database = database;
    this.schema = schema;
    this.sqliteDatabaseWrapper = new _Sqlite3Wrapper.default(database);
    this.tableStatementCreator = new _TableStatementCreator.default(schema);
  }

  static async createTableIfNotExistsAsync({
    database,
    schema
  }) {
    const tableCreator = new TableCreator({
      database: database,
      schema
    });
    return await tableCreator.createTableIfNotExistsAsync();
  }

  static async createTablesIfNotExistsAsync({
    database,
    schemas
  }) {
    const promises = schemas.map(schema => {
      const tableCreator = new TableCreator({
        database: database,
        schema
      });
      return tableCreator.createTableIfNotExistsAsync();
    });
    return await Promise.all(promises);
  }

  static async dropTableIfExistsAsync({
    database,
    schema
  }) {
    const tableCreator = new TableCreator({
      database: database,
      schema
    });
    return await tableCreator.dropTableIfExistsAsync();
  }

  static async dropTableIfExistsAsync({
    database,
    schemas
  }) {
    const promises = schemas.map(schema => {
      const tableCreator = new TableCreator({
        database: database,
        schema
      });
      return tableCreator.dropTableIfExistsAsync();
    });
    return await Promise.all(promises);
  }

  async createTableIfNotExistsAsync() {
    let {
      sql,
      values
    } = this.tableStatementCreator.createTableStatement();
    const indexStatement = this.tableStatementCreator.createIndexStatements();

    if (indexStatement != null) {
      sql = `${sql}; ${indexStatement}`;
    }

    return await this.sqliteDatabaseWrapper.runAsync(sql, values);
  }

  async dropTableIfExistsAsync() {
    const {
      sql,
      values
    } = this.tableStatementCreator.createDropTableStatment();
    return await this.sqliteDatabaseWrapper.runAsync(sql, values);
  }

}

exports.default = TableCreator;
//# sourceMappingURL=TableCreator.js.map