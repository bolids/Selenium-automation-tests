/*import fs from 'fs/promises';*/
import log from './logger';

const fs = require('fs').promises;

async function readCsv(filePath) {
    try {
        log.info("Read CSV file with test data. File path: " + filePath);
        const line = await fs.readFile(filePath, 'utf8');
        log.info(`CSV content ${line}`);
        const result = line.split(',');
        console.log(result);
        return {
            username: result[0],
            password: result[1]
            };
    } catch(error) {
            log.error("Can't find data file.");
    }
}

module.exports = readCsv;