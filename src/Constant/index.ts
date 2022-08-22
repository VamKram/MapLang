export const DIGITS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

export enum DATATYPE {
  INT = 'INT',
  FLOAT = 'FLOAT',
}

export enum SIGN {
  LPAREN = 'LPAREN',
  RPAREN = 'RPAREN',
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTI = 'MULTI',
  DIV = 'DIV',
  EOF = 'EOF'
}

export const SIGN_MAP = {
  LPAREN: '(',
  RPAREN: ')',
  PLUS: '+',
  MINUS: '-',
  MULTI: '*',
  DIV: '\\',
}

export enum NodeHandleType{
  NUMBER = "NUMBER",
  OPERATOR = "OPERATOR"
}




export type Type = DATATYPE | SIGN
export type Value = number | string | null
