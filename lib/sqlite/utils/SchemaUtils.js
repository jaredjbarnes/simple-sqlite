"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SchemaUtils = function () {
    function SchemaUtils() {
        _classCallCheck(this, SchemaUtils);
    }

    _createClass(SchemaUtils, null, [{
        key: "getTableName",
        value: function getTableName(name, version) {
            return name + "_" + version;
        }
    }, {
        key: "getTableNameFromSchema",
        value: function getTableNameFromSchema(schema) {
            return SchemaUtils.getTableName(schema.name, schema.version);
        }
    }, {
        key: "getPrimaryKeysFromSchema",
        value: function getPrimaryKeysFromSchema(schema) {
            return schema.primaryKeys;
        }
    }]);

    return SchemaUtils;
}();

exports.default = SchemaUtils;
//# sourceMappingURL=SchemaUtils.js.map