"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "name": "address",
  "label": "Address",
  "description": "Address Table",
  "columns": [{
    "type": "INTEGER",
    "name": "id",
    "label": "Identifier"
  }, {
    "type": "TEXT",
    "name": "address",
    "label": "Address",
    "description": "Street Address"
  }, {
    "type": "TEXT",
    "name": "city",
    "label": "City",
    "description": "City",
    "isIndexed": true
  }, {
    "type": "INTEGER",
    "name": "state",
    "label": "State",
    "description": "State",
    "isIndexed": true
  }, {
    "type": "INTEGER",
    "name": "zipCode",
    "label": "Zip Code",
    "description": "Zip Code"
  }, {
    "type": "INTEGER",
    "name": "personId",
    "label": "Person Id",
    "isRequired": true
  }],
  "primaryKeys": ["id"],
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
exports.default = _default;
//# sourceMappingURL=address.js.map