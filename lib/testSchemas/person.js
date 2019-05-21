"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "name": "person",
  "label": "Person",
  "description": "Person Table",
  "version": "0.0.1",
  "columns": [{
    "type": "INTEGER",
    "name": "id",
    "label": "Identifier"
  }, {
    "type": "TEXT",
    "name": "firstName",
    "label": "First Name",
    "description": "The first given name.",
    "isIndexed": true
  }, {
    "type": "TEXT",
    "name": "lastName",
    "label": "Last Name",
    "description": "Surname"
  }, {
    "type": "INTEGER",
    "name": "dateOfBirth",
    "label": "Date of Birth",
    "description": "Date of Birth"
  }],
  "primaryKeys": ["id"]
};
exports.default = _default;
//# sourceMappingURL=person.js.map