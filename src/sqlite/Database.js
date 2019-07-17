import Sqlite3Wrapper from "./Sqlite3Wrapper";
import TableCreator from "./TableCreator";
import Table from "./Table";

export default class Database {
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
        return this.schemas.find((innerSchema) => {
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
        return await TableCreator.createTableIfNotExistsAsync({
            database: this.database,
            schema
        });
    }

    async createTablesFromSchemasAsync() {
        return await this.schemas.reduce((promise, schema) => {
            return promise.then(() => {
                return this.createTableFromSchemaAsync(schema);
            })
        }, Promise.resolve());
    }

    async dropTableFromSchemaAsync(schema) {
        return await TableCreator.dropTableIfExistsAsync({
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

        return new Table({
            database: database,
            schema,
            lifeCycleDelegate
        });

    }

}