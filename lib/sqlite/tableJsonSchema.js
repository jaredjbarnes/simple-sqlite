"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "$id": "/Table",
  "title": "Description of Table",
  "type": "object",
  "definitions": {
    "primitiveTypes": {
      "type": "string",
      "enum": ["INTEGER", "TEXT", "REAL", "BLOB"]
    },
    "source": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "column": {
          "type": "string"
        }
      },
      "required": ["name", "label", "column"]
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
    "conflictOption": {
      "type": "string",
      "enum": ["ROLLBACK", "ABORT", "FAIL", "IGNORE", "REPLACE"]
    },
    "unique": {
      "type": "object",
      "properties": {
        "columns": {
          "type": "array"
        },
        "conflictOption": {
          "$ref": "#/definitions/conflictOption"
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
          "type": ["string", "number", "boolean", "integer", "null"]
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
  "required": ["name", "label", "columns", "primaryKeys"]
};
exports.default = _default;
//# sourceMappingURL=tableJsonSchema.js.map