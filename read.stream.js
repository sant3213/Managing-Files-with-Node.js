import { createReadStream } from 'fs';

const stream = createReadStream('./data/app.log', {
    highWaterMark: 9550,
    encoding: 'utf8'
});

stream.on('data', data => {
    stream.pause();

    setTimeOut(() => {
        stream.resume();
    }, 2000);
    console.log(data)
});