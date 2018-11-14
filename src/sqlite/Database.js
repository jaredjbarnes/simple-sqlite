import Sqlite3Wrapper from "./Sqlite3Wrapper";
import TableCreator from "./TableCreator";
import Repository from "./Repository";
import SchemaUtils from "./utils/SchemaUtils";

export default class Database {
    constructor({
        database,
        schemas
    }) {
        this.database = database;
        this.sqliteDatabaseWrapper = new Sqlite3Wrapper(database);
        this.schemas = Array.isArray(schemas) ? schemas : [];
    }

    hasSchema(schema) {
        return this.getSchema(schema) != null;
    }

    removeSchema(schema) {
        const index = this.schemas.findIndex(() => {
            return schema.name == innerSchema && schema.version == innerSchema.version;
        });

        if (index > -1) {
            this.schemas.splice(index, 1);
        }
    }

    getSchema(schema) {
        return this.schemas.find((innerSchema) => {
            return schema.name == innerSchema.name && schema.version == innerSchema.version;
        });
    }

    addSchema(schema) {
        this.schemas.push(schema);
    }

    removeAsync(schema) {
        this.removeSchema(schema);
    }

    createTableFromSchemaAsync(schema) {
        return TableCreator.createTableIfNotExistsAsync({
            database: this.database,
            schema
        });
    }

    createTablesFromSchemasAsync() {
        return this.schemas.reduce((promise, schema) => {
            return promise.then(()=>{
                return this.createTableFromSchemaAsync(schema);
            })
        }, Promise.resolve());
    }

    dropTableFromSchemaAsync(schema) {
        return TableCreator.dropTableIfExistsAsync({
            database: this.database,
            schema
        });
    }

    getRepository(name, version) {
        const schema = this.getSchema({ name, version });

        if (schema == null) {
            throw new Error("Unable to find repository.");
        }

        const database = this.database;

        return new Repository({
            database: database,
            schema
        });

    }

}