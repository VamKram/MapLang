import Position from "../Lexer/position";

export class Error {
  constructor(
    public start: Position,
    public end: Position,
    public errorName: string,
    public detail: string,
  ) {
    this.start = start;
    this.end = end;
    this.errorName = errorName;
    this.detail = detail;
  }

  buildError() {
    const res = `
    ${this.errorName}: ${this.detail}
    info: ${this.start.fileName}, line ${this.end.line + 1}
    `
    return res
  }
}


export class IllegalCharError extends Error {
  constructor( public start: Position,
               public end: Position,
               public detail: string
  ) {
    super(start, end, "Illegal character", detail);
  }
}

export class InvalidSyntax extends Error {
  constructor( public start: Position,
               public end: Position,
               public detail: string) {
    super(start, end, "Invalid syntax", detail);

  }

}
