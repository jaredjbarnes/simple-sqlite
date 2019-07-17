export default {
    "name": "person",
    "label": "Person",
    "description": "Person Table",
    "columns": [
        {
            "type": "INTEGER",
            "name": "id",
            "label": "Identifier"
        },
        {
            "type": "TEXT",
            "name": "firstName",
            "label": "First Name",
            "description": "The first given name.",
            "isIndexed": true
        },
        {
            "type": "TEXT",
            "name": "lastName",
            "label": "Last Name",
            "description": "Surname"
        },
        {
            "type": "INTEGER",
            "name": "dateOfBirth",
            "label": "Date of Birth",
            "description": "Date of Birth"
        }
    ],
    "primaryKeys": ["id"]
};