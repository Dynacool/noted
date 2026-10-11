import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
const output = path.resolve(".sites-runtime/tests-compiled");
function compile(input) {
  const text = fs.readFileSync(input, "utf8");
  const result = ts
    .transpileModule(text, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ES2022,
      },
    })
    .outputText.replace(/(from\s+['"])(\.[^'"]+)(['"])/g, "$1$2.js$3");
  const file = path.join(output, input.replace(/\.ts$/, ".js"));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, result);
}
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const input = dir + "/" + entry.name;
    if (entry.isDirectory()) walk(input);
    else if (input.endsWith(".ts")) compile(input);
  }
}
walk("lib/study");
walk("app/api/grade");
for (const file of fs
  .readdirSync("tests")
  .filter((f) => f.endsWith(".test.ts"))) {
  compile("tests/" + file);
  await import(
    "file:///" +
      path
        .join(output, "tests", file.replace(/\.ts$/, ".js"))
        .replaceAll("\\", "/")
  );
}
