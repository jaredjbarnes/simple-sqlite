export default {
    "$id": "/Repository",
    "title": "Description of Repository",
    "type": "object",
    "definitions": {
        "primitiveTypes": {
            "type": "string",
            "enum": ["INTEGER", "TEXT", "REAL", "INTEGER"]
        },
        "source": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "column": {
                    "type": "string"
                }
            },
            "required": ["name", "version", "label", "column"]
        },
        "foreignKey": {
            "type": "object",
            "properties": {
                "label": {
                    "type": "string"
                },
                "source": {
                    "$ref": "#/definitions/source"
                }
            },
            "required": ["label", "source"]
        },
        "uniqueItems": {
            "type": "array",
            "minItems": 1,
            "items": {
                "$ref": "#/definitions/unique",
                "minItems": 1,
                "items": {
                    "type": "string"
                }
            }
        },
        "conflictOptions": {
            "type": "string",
            "enum": ["ROLLBACK", "ABORT", "FAIL", "IGNORE", "REPLACE"]
        },
        "unique": {
            "type": "object",
            "properties": {
                "columns": {
                    "type": "array"
                },
                "conflictOptions": {
                    "$ref": "#/definitions/conflictOptions"
                }
            },
            "require": ["keys"]
        },
        "column": {
            "type": "object",
            "properties": {
                "type": {
                    "$ref": "#/definitions/primitiveTypes"
                },
                "name": {
                    "type": "string"
                },
                "label": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "isNullable": {
                    "type": "boolean"
                },
                "isIndexed": {
                    "type": "boolean"
                },
                "defaultValue": {
                    "type": ["string", "number", "boolean", "null"]
                }
            },
            "required": ["type", "name", "label"]
        }
    },
    "properties": {
        "name": {
            "type": "string"
        },
        "label": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "version": {
            "type": "string"
        },
        "columns": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/column"
            }
        },
        "primaryKeys": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {
                "type": "string"
            }
        },
        "uniqueItems": {
            "$ref": "#/definitions/uniqueItems"
        },
        "foreignKeys": {
            "type": "object",
            "additionalProperties": {
                "$ref": "#/definitions/foreignKey"
            }
        }
    },
    "required": ["name", "label", "version", "columns", "primaryKeys"]
}
