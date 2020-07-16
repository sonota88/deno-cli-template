// -*- mode: javascript -*-

// console.log("hello!");

import * as model from "./model.ts";

const { args } = Deno;
// console.log(args);

const subcmd = args[0];
const subcmdArgs = args.slice(1);
// console.log(subcmdArgs);

switch (subcmd) {
case "add":
  const a = parseInt(subcmdArgs[0]);
  const b = parseInt(subcmdArgs[1]);
  console.log(model.add(a, b));
  break;
  
default:
  console.log(args);
  break;
}
