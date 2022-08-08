import Token from "../Token";

export class NumberNode {
  constructor(public tok: Token) {
    this.tok = tok;
  }
}

export class BinOpNode {
  constructor(public l_node: Token, public op: Token, public r_node: Token) {
    this.l_node = l_node
    this.r_node = r_node
    this.op = op
  }
}

export class UnaryOpNode {
  constructor(public op: Token, public node: Token) {
    this.node = node;
    this.op = op;
  }
}


export type NodeType = NumberNode | BinOpNode | UnaryOpNode

