// -*- mode: javascript -*-

import * as cmd_cat from "./command/cat.ts";

function add(a: number, b: number){
  return a + b;
}

const cat = ()=>{
  cmd_cat.main();
}

export {
  add,
  cat
};
