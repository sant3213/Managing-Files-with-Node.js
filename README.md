# Managing-Files-with-Node.js

**<font size="5">Reading a File Asynchronously</font>**

How to read a file using the asynchronous readFile function in the fs API of Node.js.

There are three arguments:  filename, encoding and callback_function

```js
const { convertCsv } = require('./csv.parse');
const { readFile } = require('fs');

readFile('./data/pulitzer-circulation-data.csv', 'utf8', (err, data) => {
    const vals = convertCsv(data);

    console.log(vals);
})
```