import fs from 'fs/promises';
import log from './logger';

async function readJsonFile(filePath) {
    try {
        log.info("Read JSON file with test data. File path: " + filePath);
        const jsonString = await fs.readFile(filePath, 'utf8');
        log.info(`JSON content ${jsonString}`);
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch(error) {
        log.error("Can't find data file.");
    }
}

module.exports = readJsonFile;