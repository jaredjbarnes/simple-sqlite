export default {
    "name": "phoneNumber",
    "label": "Phone Number",
    "description": "Phone Number Table",
    "columns": [
        {
            "type": "INTEGER",
            "name": "id",
            "label": "Identifier"
        },
        {
            "type": "TEXT",
            "name": "type",
            "label": "Type",
            "description": "Type"
        },
        {
            "type": "INTEGER",
            "name": "personId",
            "label": "Person Id",
            "isRequired": true
        },
    ],
    "primaryKeys": ["id"],
    "unique": [
        {
            "columns": ["personId", "type"],
            "conflictOptions": "REPLACE"
        }
    ],
    "foreignKeys": {
        "personId": {
            "label": "Person",
            "source": {
                "name": "person",
                "label": "Addresses",
                "column": "id"
            }
        }
    }
};