import { writeFile } from 'fs';

/*
writeFile('./data/app.log',
    '163.3.217.18 - - [21/09/2019:10:07:21 -0500] "GET /write-file-test" 405 21512',
    (err) => {
        err ? console.log(err) : console.log('file saved!');
    });
*/

    // writeFile('./data/app.log',
    // '163.3.217.18 - - [21/09/2019:10:07:21 -0500] "GET /write-file-test" 405 21512',
    // { flag: 'wx'},
    // (err) => {
    //     err ? console.log(err) : console.log('file saved!');
    // });

    import { constants} from 'fs';
   writeFile('./data/newapp.log',
    '163.3.217.18 - - [21/09/2019:10:07:21 -0500] "GET /write-file-test" 405 21512',
    { mode: constants.S_IWUSR | constants.S_IRUSR},
    (err) => {
        err ? console.log(err) : console.log('file saved!');
    });