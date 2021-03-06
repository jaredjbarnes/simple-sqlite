import Node from "./Node";
import ValueNode from "./ValueNode";

export default class CompositeNode extends Node {
    constructor(type) {
        super(type);
        this.isComposite = true;
        this.children = [];
    }

    static fromObject(object) {
        let node;

        if (object == null) {
            return null;
        }

        if (
            typeof object.isComposite === "boolean" &&
            object.isComposite &&
            Array.isArray(object.children)
        ) {
            node = new CompositeNode(object.type);
            object.children.forEach((child) => {
                return node.children.push(CompositeNode.fromObject(child));
            });
        } else {
            node = new ValueNode(object.type, object.value);
        }

        return node;
    }

    static fromJson(json) {
        const object = JSON.parse(json);
        return this.fromObject(object);
    }

    clone() {
        const node = new CompositeNode(this.type);
        node.isComposite = this.isComposite;

        const children = this.children.map((child) => {
            return child.clone();
        });

        node.children = children;

        return node;
    }
}