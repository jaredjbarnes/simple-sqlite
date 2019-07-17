"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SqliteUtils = _interopRequireDefault(require("../utils/SqliteUtils"));

var _UniqueExpressionCreator = _interopRequireDefault(require("./UniqueExpressionCreator"));

var _SchemaValidator = _interopRequireDefault(require("../SchemaValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TableStatementCreator {
  constructor(schema) {
    this.schema = schema;
  }

  static createTableStatement(schema) {
    const tableStatementCreator = new TableStatementCreator(schema);
    return tableStatementCreator.createTableStatement();
  }

  static createDropTableStatement() {
    const tableStatementCreator = new TableStatementCreator(schema);
    return tableStatementCreator.createDropTableStatement();
  }

  getTableName() {
    return _SqliteUtils.default.escapeName(this.schema.name);
  }

  removeNullOrEmptyStrings(expression) {
    return expression.filter(part => {
      return typeof part === "string" && part.length > 0;
    });
  }

  validateSchema() {
    return _SchemaValidator.default.validate(this.schema);
  }

  createPrimaryKeysExpression() {
    const keys = this.schema.primaryKeys.map(column => {
      return _SqliteUtils.default.escapeName(column);
    }).join(", ");
    return `PRIMARY KEY(${keys})`;
  }

  createUniqueExpressions() {
    if (Array.isArray(this.schema.unique)) {
      return this.schema.unique.map(unique => {
        const uniqueExpression = new _UniqueExpressionCreator.default(unique);
        return uniqueExpression.createExpression();
      }).join(", ");
    }

    return "";
  }

  createForeignKeysExpression() {
    const foreignKeys = this.schema.foreignKeys || {};
    return Object.keys(foreignKeys).map(name => {
      const column = foreignKeys[name];

      const columnName = _SqliteUtils.default.escapeName(name);

      const source = _SqliteUtils.default.escapeName(column.source.name);

      const sourceColumn = _SqliteUtils.default.escapeName(column.source.column);

      return `FOREIGN KEY (${columnName}) REFERENCES ${source} (${sourceColumn})`;
    }).join(", ");
  }

  createTableStatement() {
    this.validateSchema();
    const expression = [];
    expression.push(this.createColumnsExpression());
    expression.push(this.createPrimaryKeysExpression());
    expression.push(this.createUniqueExpressions());
    expression.push(this.createForeignKeysExpression());
    const cleanedExpression = this.removeNullOrEmptyStrings(expression);
    const sql = `CREATE TABLE IF NOT EXISTS ${this.getTableName()} (${cleanedExpression.join(", ")})`;
    return {
      sql,
      values: []
    };
  }

  createDropTableStatment() {
    const sql = `DROP TABLE IF EXISTS ${this.getTableName()}`;
    return {
      sql,
      values: []
    };
  }

  createColumnExpression({
    name,
    type,
    isRequired,
    defaultValue
  }) {
    const expression = [];
    expression.push(`${_SqliteUtils.default.escapeName(name)}`);
    expression.push(type);

    if (isRequired) {
      expression.push("NOT NULL");
    }

    if (defaultValue != null) {
      expression.push(this.sqlizeValue(defaultValue));
    }

    return expression.join(" ");
  }

  createIndexStatements() {
    const statement = this.schema.columns.filter(column => {
      return column.isIndexed;
    }).map(column => {
      const isUnique = column.isUnique ? " UNIQUE " : " ";
      const tableName = this.getTableName();

      const name = _SqliteUtils.default.escapeName(`${this.schema.name}_${column.name}`);

      const columnName = _SqliteUtils.default.escapeName(column.name);

      return `CREATE${isUnique}INDEX IF NOT EXIST ${name} ON ${tableName} (${columnName})`;
    });

    if (statement.length > 0) {
      return statement.join(";") + ";";
    } else {
      return null;
    }
  }

  createColumnsExpression() {
    return this.schema.columns.map(column => {
      return this.createColumnExpression(column);
    }).join(", ");
  }

}

exports.default = TableStatementCreator;
//# sourceMappingURL=TableStatementCreator.js.map