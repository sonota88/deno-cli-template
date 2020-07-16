// -*- mode: javascript -*-

function add(a: number, b: number){
  console.log(a + b);
}

// console.log("hello!");

const { args } = Deno;
// console.log(args);

const subcmd = args[0];
const subcmdArgs = args.slice(1);
// console.log(subcmdArgs);

switch (subcmd) {
case "add":
  const a = parseInt(subcmdArgs[0]);
  const b = parseInt(subcmdArgs[1]);
  add(a, b);
  break;
  
default:
  console.log(args);
  break;
}
