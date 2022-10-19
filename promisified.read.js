const { convertCsv } = require('./csv.parse');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

readFile('./data/pulitzer-circulation-data.csv', 'utf8')
    .then(data => console.table(convertCsv(data)))
    .catch(err => console.log(`File error: ${err}`))