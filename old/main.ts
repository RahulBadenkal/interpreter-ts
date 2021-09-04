import { Token, TokenDisplay } from './types'

const EMPTY_SPACE = /\s/;

const getRegexMatchIndex = (text: string, startIndex: number=0, regex: RegExp) => {
  let matchedIndex = text.slice(startIndex).search(regex)
  if (matchedIndex !== -1) {
    return startIndex + matchedIndex
  }
  return -1;
}

const isDigit = (char: string) => {
  let n = char.charCodeAt(0)
  return 48 <= n && n < 58
}

const extractNumber = (text: string, startIndex: number): [number, string] => {
  let [index, endIndex] = [startIndex, startIndex];
  let num = "";
  while(isDigit(text[index])) {
    num += text[index];
    endIndex = index;
    index += 1;
  }
  return [endIndex, num]
}


const isLetter = (char: string): boolean => {
  let n = char.charCodeAt(0);
  return (n >= 65 && n < 91) || (n >= 97 && n < 123) || (char === "_");
}

const extractIdentifier = (text: string, startIndex: number): [number, string] => {
  let [index, endIndex] = [startIndex, startIndex];
  let word = "";
  while(isLetter(text[index])) {
    word += text[index];
    endIndex = index;
    index += 1;
  }
  return [endIndex, word]
}


export const main = (code: string): ([Token, string])[]  => {
  const tokens: ([Token, string])[] = [];
  for (let i=0; i<code.length; i++) {
    let token: [Token, string] = null;
    const char = code[i];
    
    // Check for single chars
    switch(char) {
      case "=":
        if (code[i+1] === '=') {
          token = ["EQUAL", "=="];
          i += 1;
        }
        else {
          token = ["ASSIGN", char];
        }
        break;
      case "+":
        if (code[i+1] === "=") {
          token = ["PLUS_ASSIGN", "+="];
          i += 1;
        }
        else {
          token = ["PLUS", char];
        }
        break;
      case "-":
        if (code[i+1] === "=") {
          token = ["MINUS_ASSIGN", "-="];
          i += 1;
        }
        else {
          token = ["MINUS", char];
        }
        break;
      case "*":
        if (code[i+1] === "=") {
          token = ["ASTERISK_ASSIGN", "*="];
          i += 1;
        }
        else {
          token = ["ASTERISK", char];
        }
        break;
      case "/":
        if (code[i+1] === "=") {
          token = ["SLASH_ASSIGN", "/="];
          i += 1;
        }
        else  {
          token = ["SLASH", char];
        }
        break;
      case ">":
        if (code[i+1] === "=") {
          token = ["GTE", ">="];
          i += 1;
        }
        else {
          token = ["GT", char];
        }
        break;
      case "<":
        if (code[i+1] === "=") {
          token = ["LTE", "<="];
          i += 1;
        }
        else {
          token = ["LT", char];
        }
        break;
      case "!":
        if (code[i+1] === "=") {
          token = ["NOT_EQUAL", "!="]
          i += 1
        }
        else {
          token = ["BANG", char];
        }
        break;
      case ",":
        token = ["COMMA", char]; break;
      case ";":
        token = ["SEMICOLON", char]; break;
      case "(":
        token = ["LPAREN", char]; break;
      case ")":
        token = ["RPAREN", char]; break;
      case "{":
        token = ["LBRACE", char]; break;
      case "}":
        token = ["RBRACE", char]; break;
      default:
        if (isDigit(char)) {
          let [endPos, number] = extractNumber(code, i);
          i = endPos;
          token = ["INT", number];
        }
        else if (isLetter(char)) {
          let [endPos, identifier] = extractIdentifier(code, i);
          i = endPos;
          switch (identifier) {
            case "let":
              token = ["LET", identifier]; break;
            case "fn":
              token = ["FUNCTION", identifier]; break;
            case "if":
              token = ["IF", identifier]; break;
            case "else":
              token = ["ELSE", identifier]; break;
            case "true":
              token = ["TRUE", identifier]; break;
            case "false":
              token = ["FALSE", identifier]; break;
            case "return":
              token = ["RETURN", identifier]; break;
            default:
              token = ["IDENT", identifier]; break;
          }
        }
    }

    if (token !== null) {
      tokens.push(token);
    }
  }

  return tokens
}

