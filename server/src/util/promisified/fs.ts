/**
 * Promisified equivalent of FS module
 *
 */
import {
    createReadStream,
    open,
    close,
    stat,
    unlink,
    writeFile,
    readFile,
    ftruncate,
    readdir,
    access
} from "fs";

import * as util from "util";

export default {
    open: util.promisify(open),
    close: util.promisify(close),
    readdir: util.promisify(readdir),
    truncate: util.promisify(ftruncate),
    readFile: util.promisify(readFile),
    writeFile: util.promisify(writeFile),
    unlink: util.promisify(unlink),
    stat: util.promisify(stat),
    createReadStream: util.promisify(createReadStream),
    access: util.promisify(access)
}
