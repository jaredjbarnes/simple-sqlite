"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Node = _interopRequireDefault(require("./Node"));

var _Queryable = _interopRequireDefault(require("../Queryable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isQueryable = object => {
  return typeof object.type === "string" && typeof object.expression === "object" && typeof object.limit === "number" && typeof object.offset === "number" && Array.isArray(object.orderBy);
};

class ValueNode extends _Node.default {
  constructor(type, value) {
    super(type);
    this.value = value == null ? null : value;
  }

  clone() {
    const node = new ValueNode(this.type, this.value);
    return node;
  }

  static fromValue(value) {
    if (typeof value === "string") {
      return new ValueNode("string", value);
    } else if (typeof value === "boolean") {
      return new ValueNode("boolean", value);
    } else if (typeof value === "number") {
      return new ValueNode("number", value);
    } else if (Array.isArray(value)) {
      return new ValueNode("array", value);
    } else if (value instanceof Date) {
      return new ValueNode("date", value);
    } else if (isQueryable(value)) {
      return new ValueNode("queryable", value);
    } else if (typeof value === "object" && value !== null) {
      return new ValueNode("object", value);
    } else {
      throw new Error("Unknown value type.");
    }
  }

}

exports.default = ValueNode;
//# sourceMappingURL=ValueNode.js.map