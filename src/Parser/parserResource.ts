import {NodeType} from "../AST";
import {Error} from '../Error';

export default class ParserResource {
  constructor(public error?: Error, public node?: NodeType) {
    this.error = error
    this.node = node
  }

  suc(node: NodeType) {
    this.node = node
    return this
  }

  fail(error: Error) {
    this.error = error
    return this;
  }

  register(res: any) {
    if (res instanceof ParserResource) {
      if (res.error) this.error = res.error;
      return res.node
    }
    return res
  }
}
