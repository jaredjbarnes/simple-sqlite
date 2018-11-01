import Provider from "./Provider";
import Queryable from "../queryable/Queryable";
import EntityToSqlFactory from "./factories/EntityToSqlFactory";
import Sqlite3Wrapper from "./Sqlite3Wrapper";

export default class Repository {
    constructor({ database, name, primaryKeys = ["id"] }) {
        this.name = name;
        this.database = database;
        this.sqliteDatabaseWrapper = new Sqlite3Wrapper(this.database);
        this.primaryKeys = primaryKeys;
    }

    addAsync(entity) {

        const entityToSqlFactory = new EntityToSqlFactory({
            tableName: this.name,
            entity,
            primaryKeys: this.primaryKeys
        });

        const { sql, values } = entityToSqlFactory.createInsertStatement();

        return this.sqliteDatabaseWrapper.runAsync(sql, values);

    }

    removeAsync(entity) {
        const entityToSqlFactory = new EntityToSqlFactory({
            tableName: this.name,
            entity,
            primaryKeys: this.primaryKeys
        });

        const { sql, values } = entityToSqlFactory.createDeleteStatement();

        return this.sqliteDatabaseWrapper.runAsync(sql, values);
    }

    updateAsync(entity) {

        const entityToSqlFactory = new EntityToSqlFactory({
            tableName: this.name,
            entity,
            primaryKeys: this.primaryKeys
        });

        const { sql, values } = entityToSqlFactory.createUpdateStatement();

        return this.sqliteDatabaseWrapper.runAsync(sql, values);

    }

    getQueryProvider() {
        return new Provider({
            database: this.database
        });
    }

    where() {
        const provider = this.getQueryProvider();

        return new Queryable({
            type: this.name,
            provider: provider
        });
    }

}