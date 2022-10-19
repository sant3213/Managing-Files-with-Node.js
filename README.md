# Managing-Files-with-Node.js

&nbsp;&nbsp;&nbsp;**<font size="4">Reading a File Asynchronously</font>**

&nbsp;&nbsp;&nbsp;How to read a file using the asynchronous readFile function in the fs API of Node.js.

&nbsp;&nbsp;&nbsp;There are three arguments:  filename, encoding and callback_function

```js
const { convertCsv } = require('./csv.parse');
const { readFile } = require('fs');

readFile('./data/pulitzer-circulation-data.csv', 'utf8', (err, data) => {
    const vals = convertCsv(data);

    console.log(vals);
})
```

&nbsp;&nbsp;&nbsp;**<font size="4">Handling Asynchronous Erros</font>**
Changing the name of the file will give us an error

```js
const { convertCsv } = require('./csv.parse');
const { readFile } = require('fs');

readFile('./data/pulitzer-circulation-data.cs', 'utf8'ev, (err, data) => {
    if(err) {
        console.log(`There was a problem with the file ${err}`);
        return;
    }
    const vals = convertCsv(data);

    console.log(vals);
})
```

&nbsp;&nbsp;&nbsp;If we don't specify the encoding for this function, it will read it into a Buffer of bytes.

```js
const { convertCsv } = require('./csv.parse');
const { readFile } = require('fs');

readFile('./data/pulitzer-circulation-data.csv', (err, data) => {
    if(err) {
        console.log(`There was a problem with the file ${err}`);
        return;
    }
    const vals = convertCsv(data);

    console.log(vals);
})
```

&nbsp;&nbsp;&nbsp;If we don't have a callback an error saying "Callback must be a function" will appear. The solution is to make sure that you have a callback that you have a callback that takes both an error and a data property.
```js
const { convertCsv } = require('./csv.parse');
const { readFile } = require('fs');

readFile('./data/pulitzer-circulation-data.csv', 'utf8');
```

&nbsp;&nbsp;&nbsp;**<font size="4">Reading a File Synchronously</font>**

&nbsp;&nbsp;&nbsp;Even though Javascript is asynchronous at its core, there are still times that it's desirable to perform a synchronous action.

&nbsp;&nbsp;&nbsp;A common use case is that you want to load data from a file and then do something with it, and until that data is loaded you do not want your application to continue.

```js
const { convertCsv} = require('./csv.parse');
const { readFileSync } = require('fs');

const data =readFileSync('./data/pulitzer-circulation-data.csv', 'utf8');

console.table(convertCsv(data));
```

&nbsp;&nbsp;&nbsp;The synchronous method don't have the callback, therefore we don't have the error but we have a throw errors and it will cause the application to crash.

&nbsp;&nbsp;&nbsp;We can implement a try catch for the application not to crash.

```js
const { convertCsv} = require('./csv.parse');
const { readFileSync } = require('fs');


try {
    const data =readFileSync('./data/pulitzer-circulation-data.csv', 'utf8');
    console.table(convertCsv(data));
} catch (err) {
    console.log(`There was a problem with the file ${err}`)
}
```

&nbsp;&nbsp;&nbsp;We will see an error description,  but we won't see a stack trace on the console. That´s because the catch handles the error, displays a message and the allows the application to complete successfully.

&nbsp;&nbsp;&nbsp;<font size="3"><strong>This method will block all the other code. If the file we are reading was enormous,it's likely that the node application would sit at the readFileSync line for a quite some time.</strong></font>



**<font size="4">&nbsp;- Reading Asynchronously without Callbacks</font>**

&nbsp;&nbsp;&nbsp;To avoid the callbacks while simultaneously not writing blocking Javascript code.

&nbsp;&nbsp;&nbsp;To convert the readFile function to not require a callback, we have to pass that function to promisify.
After that we have a function, readFile, that requires a promise instead of requiring a callback.

```js
const readFile = promisify(fs.readFile);
```

- fs.readFile is not a string, it is the actual function from fs.
- In order to promisify to work, the function that is getting promisified must have a callback that has the common error, then data parameters. If the order is different, you'll get unexpected results.

```js
const readFile = promisify(fs.readFile);

readFile('./data/pulitzer-circulation-data.csv', 'utf8')
    .then(data => console.table(convertCsv(data)))
    .catch(err => console.log(`File error: ${err}`))

```