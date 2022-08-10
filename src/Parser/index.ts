import Token from "../Token";
import {DATATYPE, SIGN} from "../Constant";
import ParserResource from "./parserResource";
import {BinOpNode, NumberNode, UnaryOpNode} from "../AST";
import {InvalidSyntax} from "../Error";
import Position from "../Lexer/position";

export class Parser {
  public tok_idx = -1;
  public curTok: Token | null = null;
  constructor(public tokens: Token[]) {
    this.tokens = tokens;
    this.adv()
  }

  private adv() {
    this.tok_idx += 1
    if (this.tok_idx < this.tokens.length) {
      this.curTok = this.tokens[this.tok_idx];
    }
    return this.curTok
  }

  parse() {
    const res = this.expr();
    if (!res.error && this.curTok?.type !== SIGN.EOF) {
      return res.fail(new InvalidSyntax(this.curTok?.p_start as Position, this.curTok?.p_end as Position, "expected + - * /"))
    }
    return res;
  }

  /*
  * expr -> term((PLUS|MINUS) term)
  * term -> factor (MUL | DIV) factor
  * factor -> INT | FLOAT
  *        -> (PLUS | MINUS) factor -1 +1
  *        -> LPAREN expr RPAREN
  *
  *
  *
  * */

  factor = () => {
    const res = new ParserResource()
    const tok = this.curTok;
    if (([DATATYPE.INT, DATATYPE.FLOAT]).includes(tok?.type as DATATYPE)) {
      res.register(this.adv())
      return res.suc(new NumberNode(tok as Token));
    }
    if (([SIGN.PLUS, SIGN.MINUS]).includes(tok?.type as SIGN)) {
      res.register(this.adv())
      const _factor = res.register(this.factor());
      if (res.error) {
        return res
      }
      return res.suc(new UnaryOpNode(tok as Token, _factor))
    }
    if (tok?.type === SIGN.LPAREN) {
      res.register(this.adv())
      const expr = res.register(this.expr())
      if (res.error) return res
      if (this.curTok?.type === SIGN.RPAREN) {
        res.register(this.adv())
        return res.suc(expr)
      }
      return res.fail(new InvalidSyntax(this.curTok?.p_start as Position, this.curTok?.p_end as Position, "expected right paren"))
    }
    return res.fail(new InvalidSyntax(this.curTok?.p_start as Position, this.curTok?.p_end as Position, "expected int or float"))
  }

  term = () => {
    return this.binOp(this.factor, [SIGN.MULTI, SIGN.DIV])
  }



  private expr() {
    return this.binOp(this.term, [SIGN.PLUS, SIGN.MINUS])
  }

  private binOp(func: () => (ParserResource | undefined), divs: SIGN[]) {
    const res = new ParserResource();
    let l = res.register(func())

    while (divs.includes(this.curTok?.type as any)) {
      const opTok = this.curTok;
      res.register(this.adv())
      const r = res.register(func())
      l = new BinOpNode(l, opTok as Token, r);
    }
    return res.suc(l);
  }
}
