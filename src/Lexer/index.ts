import Position from './position'
import {isDigits} from "../Tools";
import Token from "../Token";
import {DATATYPE, SIGN, SIGN_MAP} from "../Constant";
import {IllegalCharError} from "../Error";

interface LexerImpl {
  makeTokens(): any
}


export default class Lexer implements LexerImpl {
  private pos: Position;
  private cur: string | null = "";

  constructor(private fileName: string, private text: string) {
    this.fileName = fileName;
    this.text = text;
    this.pos = new Position(-1, 0, -1, fileName, text)
    this.adv()
  }

  makeTokens(): any {
    const tokens: Token[] = [];
    while (this.cur !== null) {
      if ([' ', '\t'].includes(this.cur)) {
        this.adv()
      } else if (isDigits(this.cur)) {
        tokens.push(this.makeNumber())
      } else if (this.cur === SIGN_MAP.PLUS) {
        tokens.push(new Token(SIGN.PLUS, this.cur, this.pos))
        this.adv();
      } else if (this.cur === SIGN_MAP.LPAREN) {
        tokens.push(new Token(SIGN.LPAREN, this.cur, this.pos))
        this.adv();
      } else if (this.cur === SIGN_MAP.RPAREN) {
        tokens.push(new Token(SIGN.RPAREN, this.cur, this.pos))
        this.adv();
      } else if (this.cur === SIGN_MAP.MINUS) {
        tokens.push(new Token(SIGN.MINUS, this.cur, this.pos))
        this.adv();
      } else if (this.cur === SIGN_MAP.MULTI) {
        tokens.push(new Token(SIGN.MULTI, this.cur, this.pos))
        this.adv();
      } else if (this.cur === SIGN_MAP.DIV) {
        tokens.push(new Token(SIGN.DIV, this.cur, this.pos))
        this.adv();
      } else {
        new IllegalCharError(this.pos, this.pos, this.cur)
        return []
      }
    }
    tokens.push(new Token(SIGN.EOF, null, this.pos));
    return tokens
  }

  adv() {
    this.cur !== null && this.pos.adv(this.cur)
    if (this.pos.idx < this.text.length) {
      this.cur = this.text[this.pos.idx]
    } else {
      this.cur = null;
    }
  }

  private makeNumber() {
    let numberStr = '',
      dot = 0;
      const start = this.pos.clone()
    while (this.cur !== null && /\d+(\.)?/g.test(this.cur)) {
      if (this.cur === '.') {
        if (dot === 1) {
          break
        }
        dot++
        numberStr += '.'
      } else {
        numberStr += this.cur
      }
      this.adv();
    }
    if (dot === 0) {
      return new Token(DATATYPE.INT, Number(numberStr), start, this.pos)
    }
    return new Token(DATATYPE.FLOAT, Number(numberStr), start, this.pos)
  }
}
