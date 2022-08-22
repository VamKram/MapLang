import {BinOpNode, NodeType, NumberNode} from "../AST";
import {Error} from '../Error';
import Position from "../Lexer/position";
import {SIGN, SIGN_MAP} from "../Constant";
import Token from "../Token";

export default class RtRes {
  private node: ItemLogicImpl | null;
  private error: Error | null;

  constructor() {
    this.node = null
    this.error = null
  }

  succ<T extends ItemLogicImpl>(node: T) {
    this.node = node;
    return this;
  }

  fail(error: Error) {
    this.error = error
    return this;
  }

  register<T extends ItemLogicImpl> (res: T) {
    if (res.error) {
      this.error = res.error;
    }
    return res;
  }
}

interface ItemLogicImpl {
  error: Error | null;

  setPos(start: Position, end: Position): this

  setContext(ctx: any): this
}

abstract class ItemLogic<T> implements ItemLogicImpl {
  public context: any = null;
  public start: Position | null = null;
  public end: Position | null = null;
  public error: Error | null = null;

  constructor(public value: T) {
    this.value = value;
  }

  setContext(ctx: any): this {
    this.context = ctx;
    return this;
  }

  setPos(start: Position, end: Position): this {
    this.start = start;
    this.end = end;
    return this;
  }
}

class Context {
  constructor(public displayName: string, public parent: Context | null, public parentPos: Position | null) {
    this.displayName = displayName || 'Program'
    this.parent = parent
    this.parentPos = parentPos
  }
}

class NumberLogic extends ItemLogic<number> {
  check(value: any) {
    if (!(value instanceof NumberLogic)) {
      //  TODO: Error
    }
    return true
  }

  add(other: NumberLogic) {
    if (this.check(other)) {
      return new NumberLogic(this.value + other.value).setContext(this.context);
    }
    return new Error(other.start as Position, other.end as Position, "wrong method", "wrong")
  }

  minus(other: NumberLogic) {
    if (this.check(other)) {
      return new NumberLogic(this.value - other.value).setContext(this.context);
    }
    return new Error(other.start as Position, other.end as Position, "wrong method", "wrong")
  }

  mulitple(other: NumberLogic) {
    if (this.check(other)) {
      return new NumberLogic(this.value * other.value).setContext(this.context);
    }
    return new Error(other.start as Position, other.end as Position, "wrong method", "wrong")
  }

  divsion(other: NumberLogic) {
    if (this.check(other)) {
      return new NumberLogic(this.value / other.value).setContext(this.context);
    }
    return new Error(other.start as Position, other.end as Position, "wrong method", "wrong")
  }
}

class Interpreter {
  constructor() {
  }

  /*
  * 递归下降
  * */
  visit(node: Token, ctx: Context) {
    return node as unknown as NumberLogic

  }

  defaultVisit(node: NodeType) {
    throw `${node.__name} is wrong node`
  }

  visitNumber (node: NumberNode, context: Context) {
    return new RtRes().succ(
      new NumberLogic(
        node.tok.value as number
      ).setContext(context).setPos(node.tok.p_start as Position, node.tok.p_end as Position)
    )
  }

  visitOp (node: BinOpNode, context: Context)  {
    const rRes = new RtRes()
    const left = rRes.register(this.visit(node.l_node, context))
    const right = rRes.register(this.visit(node.r_node, context))
    let res;
    if (node.op.type === SIGN_MAP.PLUS) {
      res = (left).add(right)
    }  else if (node.op.type === SIGN.MINUS) {
      res = left.minus(right)
    } else if (node.op.type === SIGN.MULTI) {
      res = left.mulitple(right)
    } else if (node.op.type === SIGN.DIV){
      res = left.divsion(right)
    }
    if (!res || res instanceof Error ) {
      return rRes.fail(new Error(node.op.p_start as Position, node.op.p_end as Position, "wrong visitOp", "visitOp"))
    }
    return rRes.succ(res?.setPos(node.op.p_start as Position, node.op.p_end as Position) as NumberLogic)

  }

}
