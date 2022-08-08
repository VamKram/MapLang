import {Type, Value} from "../Constant";
import Position from "../Lexer/position";

export default class Token {
  constructor(
    public type: Type,
    public value: Value,
    public p_start?: Position,
    public p_end?: Position
  ) {
    this.type = type;
    this.value = value;
    if (p_start) {
      this.p_start = p_start.clone();
      this.p_end = p_start.clone();
      this.p_end.adv(this.value as string );
    }
    if (p_end) {
      this.p_end = p_end;
    }
  }

}
