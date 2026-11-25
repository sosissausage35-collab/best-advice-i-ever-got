// best-advice-i-ever-got — writes one sentence of advice to /output/entry.txt
// Node 22, no dependencies. The sentence is the entry: a single sentence,
// no longer than 200 characters, exactly as the bounty brief requires.

import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "My father told me the night I wanted to quit that a man isn't measured by how fast he starts, but by whether he still shows up when nobody is watching.";

function validate(sentence) {
  if (typeof sentence !== "string" || sentence.length === 0) {
    throw new Error("sentence must be non-empty");
  }
  // Count characters, not bytes.
  const chars = [...sentence].length;
  if (chars > 200) {
    throw new Error(`sentence is ${chars} characters, over the 200 limit`);
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    throw new Error("sentence must be a single line");
  }
  if (sentence !== sentence.trim()) {
    throw new Error("sentence must not have leading or trailing whitespace");
  }
  if (!sentence.endsWith(".")) {
    throw new Error("sentence must end with a single terminal period");
  }
  const body = sentence.slice(0, -1);
  if (/[.!?]/.test(body)) {
    throw new Error("sentence must contain exactly one sentence-ending mark");
  }
  return chars;
}

const count = validate(SENTENCE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE + "\n", "utf8");
console.log(`Wrote /output/entry.txt (${count} characters)`);
