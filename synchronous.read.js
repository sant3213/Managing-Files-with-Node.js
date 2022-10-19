const { convertCsv} = require('./csv.parse');
const { readFileSync } = require('fs');

try {
    const data =readFileSync('./data/pulitzer-circulation-data.csv', 'utf8');
    console.table(convertCsv(data));
} catch (err) {
    console.log(`There was a problem with the file ${err}`)
}

