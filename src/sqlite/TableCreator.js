import Sqlite3Wrapper from "./Sqlite3Wrapper";
import TableStatementCreator from "./statements/TableStatementCreator";

export default class TableCreator {
    constructor({
        database,
        schema
    }) {
        this.database = database;
        this.schema = schema;
        this.sqliteDatabaseWrapper = new Sqlite3Wrapper(database);
        this.tableStatementCreator = new TableStatementCreator(schema);
    }

    static async createTableIfNotExistsAsync({ database, schema }) {
        const tableCreator = new TableCreator({
            database: database,
            schema
        });

        return await tableCreator.createTableIfNotExistsAsync();
    }

    static async createTablesIfNotExistsAsync({ database, schemas }) {
        const promises = schemas.map((schema) => {
            const tableCreator = new TableCreator({
                database: database,
                schema
            });

            return tableCreator.createTableIfNotExistsAsync();
        });

        return await Promise.all(promises);
    }

    static async dropTableIfExistsAsync({ database, schema }) {
        const tableCreator = new TableCreator({
            database: database,
            schema
        });

        return await tableCreator.dropTableIfExistsAsync();
    }

    static async dropTableIfExistsAsync({ database, schemas }) {

        const promises = schemas.map((schema) => {
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
        
        if (indexStatement != null){
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