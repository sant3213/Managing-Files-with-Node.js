import { createReadStream, createWriteStream } from 'fs';

/**
 * it load the 64KB in each chunk
 */
const stream = createReadStream('./data/stream.log', {
    encoding: "utf8"
});

const writer = createWriteStream("./data/output.log");

stream.pipe(writer);