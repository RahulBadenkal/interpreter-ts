export type Token = 
  "ILLEGAL" | "EOF" | 
  // Identifiers + literals
  "IDENT" | "INT" |
  // Operators
  "ASSIGN" | "PLUS" | "MINUS" | "ASTERISK" | "SLASH" | "GT" | "LT" | "BANG" | "EQUAL" | "GTE" | "LTE" | "NOT_EQUAL" | "PLUS_ASSIGN" | "MINUS_ASSIGN" | "ASTERISK_ASSIGN" | "SLASH_ASSIGN" |
  // Delimiters
  "COMMA" | "SEMICOLON" |
  "LPAREN" | "RPAREN" | "LBRACE" | "RBRACE" |
  // Keywords
  "FUNCTION" | "LET" | "IF" | "ELSE" | "TRUE" | "FALSE" | "RETURN"


export const TokenDisplay: {[key in Token]: string} = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",
  IDENT: "IDENT",
  INT: "INT",
  ASSIGN: "=",
  PLUS: "+",
  MINUS: "-",
  ASTERISK: "*",
  SLASH: "/",
  GT: ">",
  LT: "<",
  BANG: "!",
  EQUAL: "==",
  LTE: "<=",
  GTE: ">=",
  NOT_EQUAL: "!=",
  PLUS_ASSIGN: "+=",
  MINUS_ASSIGN: "-=",
  ASTERISK_ASSIGN: "*=",
  SLASH_ASSIGN: "/=",
  COMMA: ",",
  SEMICOLON: ";",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",
  FUNCTION: "FUNCTION",
  LET: "LET",
  IF: "if",
  ELSE: "else",
  TRUE: "true",
  FALSE: "false",
  RETURN: "return"
}
