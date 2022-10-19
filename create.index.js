import { closeSync, openSync, readdirSync, watch, writeSync } from 'fs';
import camelCase from 'camelCase';

watch("./read", () => {
  const indexFd = openSync("./index.js", "w");

  const files = readdirSync("./read");

  files.map(f => {
    const name = f.replace("js", "");
    console.log(`Adding a file: ${f}`);

    writeSync(
      indexFd,
      `module.exports.${camelCase(name)} = require('./read/${name}').read;\n`
    );
  });

  closeSync(indexFd);
});