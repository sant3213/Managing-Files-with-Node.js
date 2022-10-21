import { createReadStream, createWriteStream, writeData } from 'fs';

/**
 * it load the 64KB in each chunk
 */
const stream = createReadStream('./data/stream.log', {
    encoding: "utf8"
});

const writer = createWriteStream("./data/output.log");

let iteration = 0;
/**
 * The data on event is not pausing the stream.
 * It is reading as fast as it possibly can.
 */
stream.on('data', data => {

    writeData(data); 
    setTimeout(() => {
        stream.resume();
    }, 1000)
});

const writeData = data => {
    /**
     * Most of the time We don't want to set a timeout in our code
     * This is only to simulate a write stream that is much slower than the read stream.
     */
    setTimeout(() => {
        writer.write(data);
    }, 6000)
}
stream.pipe(writer);