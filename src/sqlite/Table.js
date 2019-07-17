import Provider from "./Provider";
import Queryable from "../queryable/Queryable";
import Sqlite3Wrapper from "./Sqlite3Wrapper";
import InsertStatementCreator from "./statements/InsertStatementCreator";
import UpdateStatementCreator from "./statements/UpdateStatementCreator";
import DeleteStatementCreator from "./statements/DeleteStatementCreator";
import invokeMethodAsync from "./utils/invokeMethodAsync";

export default class Table {
    constructor({ database, schema, lifeCycleDelegate }) {

        if (lifeCycleDelegate == null || typeof lifeCycleDelegate !== "object") {
            lifeCycleDelegate = {};
        }

        this.name = schema.name;
        this.database = database;
        this.sqliteDatabaseWrapper = new Sqlite3Wrapper(this.database);
        this.primaryKeys = schema.primaryKeys;
        this.lifeCycleDelegate = lifeCycleDelegate;
    }

    async addAsync(entity) {

        await invokeMethodAsync(
            this.lifeCycleDelegate,
            "canEntityBeAddedAsync",
            [entity, this.schema]
        );

        const alteredEntity = await invokeMethodAsync(
            this.lifeCycleDelegate,
            "prepareEntityToBeAddedAsync",
            [entity, this.schema],
            entity
        );

        const { sql, values } = InsertStatementCreator.createStatement({
            tableName: this.name,
            entity: alteredEntity,
            primaryKeys: this.primaryKeys
        });

        const result = await this.sqliteDatabaseWrapper.runAsync(sql, values);

        return await invokeMethodAsync(
            this.lifeCycleDelegate,
            "entityAddedAsync",
            [alteredEntity, result, this.schema],
            result
        );

    }

    async removeAsync(entity) {

        await invokeMethodAsync(
            this.lifeCycleDelegate,
            "canEntityBeRemovedAsync",
            [entity, this.schema]
        );

        const alteredEntity = await invokeMethodAsync(
            this.lifeCycleDelegate,
            "prepareEntityToBeRemovedAsync",
            [entity, this.schema],
            entity
        );

        const { sql, values } = DeleteStatementCreator.createStatement({
            tableName: this.name,
            entity: alteredEntity,
            primaryKeys: this.primaryKeys
        });

        const result = await this.sqliteDatabaseWrapper.runAsync(sql, values);

        return invokeMethodAsync(
            this.lifeCycleDelegate,
            "entityRemovedAsync",
            [alteredEntity, result, this.schema],
            result
        );

    }

    async updateAsync(entity) {
        await invokeMethodAsync(
            this.lifeCycleDelegate,
            "canEntityBeUpdatedAsync",
            [entity, this.schema]
        );

        const alteredEntity = await invokeMethodAsync(
            this.lifeCycleDelegate,
            "prepareEntityToBeUpdatedAsync",
            [entity, this.schema],
            entity
        );

        const { sql, values } = UpdateStatementCreator.createStatement({
            tableName: this.name,
            entity: alteredEntity,
            primaryKeys: this.primaryKeys
        });

        const result = await this.sqliteDatabaseWrapper.runAsync(sql, values);

        return await invokeMethodAsync(
            this.lifeCycleDelegate,
            "entityUpdatedAsync",
            [alteredEntity, result, this.schema],
            result
        );

    }

    getQueryProvider() {
        return new Provider({
            database: this.database,
            lifeCycleDelegate: this.lifeCycleDelegate
        });
    }

    where() {
        const provider = this.getQueryProvider();

        return new Queryable({
            query: {
                type: this.name,
                expression: null,
                select: {},
                limit: -1,
                offset: 0,
                orderBy: []
            },
            provider: provider
        });
    }

}