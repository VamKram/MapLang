import Token from "../Token";
import {NodeHandleType} from "../Constant";

abstract class Node {
  abstract __name: Readonly<NodeHandleType>
}
export class NumberNode extends Node{
  constructor(public tok: Token) {
    super();
    this.tok = tok;
  }
  __name: Readonly<NodeHandleType> = NodeHandleType.NUMBER;
}

export class BinOpNode extends Node{
  constructor(public l_node: Token, public op: Token, public r_node: Token) {
    super();
    this.l_node = l_node
    this.r_node = r_node
    this.op = op
  }

  __name: Readonly<NodeHandleType> = NodeHandleType.OPERATOR;
}

export class UnaryOpNode extends Node{
  constructor(public op: Token, public node: Token) {
    super();
    this.node = node;
    this.op = op;
  }

  __name = NodeHandleType.OPERATOR
}


export type NodeType = NumberNode | BinOpNode | UnaryOpNode

