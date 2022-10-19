const fs = require('fs');

console.log('Opening files...');
for (let index = 0; index < 185000; index++) {
    const fd = fs.openSync('./data/app.log');    
    console.log(fd);
    //fs.closeSync(fd);
    fs.close(fd, () => {});
}