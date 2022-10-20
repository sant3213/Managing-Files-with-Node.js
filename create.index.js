const { closeSync, openSync, readdirSync, watch, writeSync } = require('fs');
// {camelCase} = require('camelcase');
const camelCase = import('camelCase');

watch("./read", () => {
  console.log(camelCase);
  /**
   * if we don't specify the 'w' parameter, the file will be opened
   * in a read mode and will throw an exception when we try to write it.
   */
  const indexFd = openSync("./index.js", "w");

  /**
   * Finds all of the contents in that folder.
   */
  const files = readdirSync("./read");

  /**
   * Loops over the files.
   */
  files.map(f => {
    /**
     * Takes the name of the file and strip off its extension.
     */
    const name = f.replace("js", "");
    console.log(`Adding a file: ${f}`);

    /**
     * We want to write a line inside of index.js for each file that we have,
     * so we need to add a call to writeSync and make sure to pass in the 
     * file descriptor indexFd as the first parameter.
     * The second parameter is what we want to write.
     */
    writeSync(
      indexFd,
      `module.exports.${camelCase(name)} = require('./read/${name}').read;\n`
    );
  });

  /**
   * Any time we open a file we  have to make sure that we close it.
   */
  closeSync(indexFd);
});