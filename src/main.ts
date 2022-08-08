import Lexer from "./Lexer";
import {Parser} from "./Parser";
export function exec(fn: string, text: string) {
  const lexer = new Lexer(fn, text)
  const tokens = lexer.makeTokens();
  const parser = new Parser(tokens)
  const ast = parser.parse();
  return ast
}

