import { Token, TokenDisplay } from './types';
import { main } from './main';


const tests: { input: string, output: [Token, string][] }[] = [
  {
    input: `=+(){},;`,
    output: [
      ["ASSIGN", "="], ["PLUS", "+"], ["LPAREN", "("], ["RPAREN", ")"], ["LBRACE", "{"], ["RBRACE", "}"], ["COMMA", ","], ["SEMICOLON", ";"],
    ]
  },
  {
    input: `let five_num = 5;`,
    output: [
        ["LET", "let"], ["IDENT", "five_num"], ["ASSIGN", "="], ["INT", "5"], ["SEMICOLON", ";"]
    ]
  },
  {
    input: 
`let five = 5; 
let ten = 10;
let add = fn(x, y) {
  x + y;
};
let result = add(five, ten);`,
    
    output: [
      ["LET", "let"], ["IDENT", "five"], ["ASSIGN",  "="], ["INT", "5"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "ten"], ["ASSIGN", "="], ["INT", "10"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "add"], ["ASSIGN", "="], ["FUNCTION", "fn"], ["LPAREN", "("], ["IDENT", "x"], ["COMMA", ","], ["IDENT", "y"], ["RPAREN", ")"], ["LBRACE", "{"],
      ["IDENT", "x"], ["PLUS", "+" ], ["IDENT", "y"], ["SEMICOLON", ";"],
      ["RBRACE", "}"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "result"], ["ASSIGN", "="], ["IDENT", "add"], ["LPAREN", "("], ["IDENT", "five"], ["COMMA", ","], ["IDENT", "ten"], ["RPAREN", ")"], ["SEMICOLON", ";"]
    ]
  },
  {
    input:
`!-/*5;
5 < 10 > 5;`,
    output: [
      ["BANG", "!"], ["MINUS", "-"], ["SLASH", "/"], ["ASTERISK", "*"], ["INT", "5"], ["SEMICOLON", ";"],
      ["INT", "5"], ["LT", "<"], ["INT", "10"], ["GT", ">"], ["INT", "5"], ["SEMICOLON", ";"]
    ]
  },
  {
    input:
`if (5 < 10) {
  return true;
}
else {
  return false;
}`,
    output: [
      ["IF", "if"], ["LPAREN", "("], ["INT", "5"], ["LT", "<"], ["INT", "10"], ["RPAREN", ")"], ["LBRACE", "{"],
      ["RETURN", "return"], ["TRUE", "true"], ["SEMICOLON", ";"],
      ["RBRACE", "}"],
      ["ELSE", "else"], ["LBRACE", "{"],
      ["RETURN", "return"], ["FALSE", "false"], ["SEMICOLON", ";"],
      ["RBRACE", "}"]
    ]
  },
  {
    input:
`let five = 5; 
let ten = 10;
let add = fn(x, y) {
  x + y;
};
let result = add(five, ten);

!-/*5;
5 < 10 > 5;

if (5 < 10) {
  return true;
}
else {
  return false;
}`,

    output: [
      ["LET", "let"], ["IDENT", "five"], ["ASSIGN",  "="], ["INT", "5"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "ten"], ["ASSIGN", "="], ["INT", "10"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "add"], ["ASSIGN", "="], ["FUNCTION", "fn"], ["LPAREN", "("], ["IDENT", "x"], ["COMMA", ","], ["IDENT", "y"], ["RPAREN", ")"], ["LBRACE", "{"],
      ["IDENT", "x"], ["PLUS", "+" ], ["IDENT", "y"], ["SEMICOLON", ";"],
      ["RBRACE", "}"], ["SEMICOLON", ";"],
      ["LET", "let"], ["IDENT", "result"], ["ASSIGN", "="], ["IDENT", "add"], ["LPAREN", "("], ["IDENT", "five"], ["COMMA", ","], ["IDENT", "ten"], ["RPAREN", ")"], ["SEMICOLON", ";"],

      ["BANG", "!"], ["MINUS", "-"], ["SLASH", "/"], ["ASTERISK", "*"], ["INT", "5"], ["SEMICOLON", ";"],
      ["INT", "5"], ["LT", "<"], ["INT", "10"], ["GT", ">"], ["INT", "5"], ["SEMICOLON", ";"],

      ["IF", "if"], ["LPAREN", "("], ["INT", "5"], ["LT", "<"], ["INT", "10"], ["RPAREN", ")"], ["LBRACE", "{"],
      ["RETURN", "return"], ["TRUE", "true"], ["SEMICOLON", ";"],
      ["RBRACE", "}"],
      ["ELSE", "else"], ["LBRACE", "{"],
      ["RETURN", "return"], ["FALSE", "false"], ["SEMICOLON", ";"],
      ["RBRACE", "}"]
    ]
  },
]

const whereError = (output1: [Token, string][], output2: [Token, string][]): number => {
  let i = 0;
  for (i = 0; i<Math.min(output1.length, output2.length); i++) {
    if ((output1[i][0] !== output2[i][0]) || (output1[i][1] !== output2[i][1])) {
      return i;
    }
  }
  if (output1.length !== output2.length) {
    return i;
  }
  return -1;
}


const formattedErrorPrint = (output: [Token, string][], index: number) => {
  for (let i=0; i<output.length; i++) {
    console.log(output[i].join(" ") + (i === index? ' <-- Problem here': ''));
  }
}

let failedCount = 0;
for (let i=0; i<tests.length; i++) {
  const test = tests[i];
  console.log(`---------- TEST: ${i+1} ----------`);
  const output = main(test.input);
  if (JSON.stringify(test.output) !== JSON.stringify(output)) {
    failedCount += 1;
    let errorAt = whereError(test.output, output);
    console.log('FAILED');
    console.log('---------- Input: ----------');
    console.log(test.input + '\n');
    console.log('---------- Expected output: ----------')
    formattedErrorPrint(test.output, errorAt);
    console.log();
    console.log('---------- Actual output: ----------');
    formattedErrorPrint(output, errorAt)
    console.log();
  }
}
if (failedCount > 0) {
  console.log(`${failedCount} testcases failed`);
}
else {
  console.log("All testcases passed")
}