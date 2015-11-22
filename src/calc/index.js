import {Set} from "immutable";

// <block>  ::=  '=' <expr>
// <expr>   ::= <term> [ ('+'|'-') <term> ]*
// <term>   ::= <factor> [ ('*'|'/') <factor> ]*
// <func>   ::= [[a-z]|[A-Z]|[0-9]]* '(' <param> ')'
// <factor> ::= <text>  | <func>  | <number> | <id> | '(' <expr> ')'
// <id>     ::= [A-Z]+ [0-9]+
//
// <number> :== [0-9]+[\.]?[0-9]*
// <text>   ::= '"' [*]  '"'
// <param>  ::= (<range>|<expr>) [,(<range>|<expr>)]*
// <range>  ::= [A-Z]+ [0-9]+ : [A-Z]+ [0-9]+


import SolverModel from "./solver";
import {expr} from "./expr";
const isCalc = function(text){
  const tmp = text + "";
  return (tmp.charAt(0) === "=");
};
const calc = function(text, sheet){
  if(!text){
    return {
      value: text,
      refs: Set(),
      isError: false
    };
  }
  text = text + "";
  if(isCalc(text) === false){
    return {
      value: text,
      refs: Set(),
      isError: false
    };
  }
  let solver = SolverModel.createEmpty()
    .setText(text.substr(1))
    .setView(sheet);

  solver = expr(solver);

  return {
    value: solver.value,
    refs: solver.refIds,
    isError: solver.isError
  };

};

export{
  calc,
  isCalc
};
