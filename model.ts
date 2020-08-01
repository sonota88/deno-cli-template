// -*- mode: javascript -*-

import * as cmd_cat from "./command/cat.ts";
import * as cmd_cat_file from "./command/cat_file.ts";

function add(a: number, b: number){
  return a + b;
}

const cat = ()=>{
  cmd_cat.main();
}

const catFile = (path: string)=>{
  cmd_cat_file.main(path);
}

export {
  add,
  cat,
  catFile
};
