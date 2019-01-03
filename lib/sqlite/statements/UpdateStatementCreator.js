"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SqliteUtils = require("../utils/SqliteUtils");

var _SqliteUtils2 = _interopRequireDefault(_SqliteUtils);

var _AbstractStatementCreator = require("./AbstractStatementCreator");

var _AbstractStatementCreator2 = _interopRequireDefault(_AbstractStatementCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UpdateStatementCreator = function (_AbstractStatementCre) {
    _inherits(UpdateStatementCreator, _AbstractStatementCre);

    function UpdateStatementCreator() {
        _classCallCheck(this, UpdateStatementCreator);

        return _possibleConstructorReturn(this, (UpdateStatementCreator.__proto__ || Object.getPrototypeOf(UpdateStatementCreator)).apply(this, arguments));
    }

    _createClass(UpdateStatementCreator, [{
        key: "createStatement",
        value: function createStatement() {
            var _this2 = this;

            var entity = this.entity;
            var keys = Object.keys(entity);

            if (!this.validateEntityPrimaryKeys()) {
                throw new Error("Cannot update entity: Invalid primary key(s).");
            }

            var sqliteData = keys.reduce(function (accumulator, key) {
                if (_this2.primaryKeys.includes(key)) {
                    return accumulator;
                }

                accumulator.placeHolderValues.push(_SqliteUtils2.default.escapeName(key) + " = ?");
                accumulator.values.push(entity[key]);
                return accumulator;
            }, { placeHolderValues: [], values: [] });

            var whereStatement = this.createWhereExpression();

            return {
                sql: "UPDATE " + _SqliteUtils2.default.escapeName(this.tableName) + " SET " + sqliteData.placeHolderValues.join(", ") + " " + whereStatement,
                values: sqliteData.values
            };
        }
    }], [{
        key: "createStatement",
        value: function createStatement(options) {
            var updateStatementCreator = new UpdateStatementCreator(options);
            return updateStatementCreator.createStatement();
        }
    }]);

    return UpdateStatementCreator;
}(_AbstractStatementCreator2.default);

exports.default = UpdateStatementCreator;
//# sourceMappingURL=UpdateStatementCreator.js.map