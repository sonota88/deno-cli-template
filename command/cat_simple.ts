import { readLines } from "https://deno.land/std/io/mod.ts";

for await (let line of readLines(Deno.stdin)) {
  console.log(line);
}
