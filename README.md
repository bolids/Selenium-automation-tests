Test Atomation Selenium
## SELENIUM TEST PROJECT SETUP
1. Create new folder for API_tests project on the PC
2. Open this folder in VC Code
3. Check installed versions of the
	
	3.1. node:
   
    `node -v`

	3.2. npm:
   
    `npm -version`

4. Setup environment. Install dependencies (jest, babel, log4j, axios):

	4.1. Open terminal in VS Code.

	4.2. Initialize project:
   
   	`npm init -y`

	4.3. Install Jest:

   	`npm install --save-dev jest`

	4.4. Open file package.json. Change field "scripts", set command jest for run:

   	```
	"scripts": {
		"test": "jest"
	}
	```
	
 	4.5 Add babel for Jest (Babel is a JavaScript compiler​):
   
	`npm install --save-dev babel-jest`

	4.6 Preset env (for running tests via jest) for using test runner jest:
   
	`npm install --save-dev @babel/preset-env --save-dev`

	4.7 Add babel configurations from the [babel web-site](https://babeljs.io/setup#installation)
   

	4.7.1 from usage info select part like:
   ```
   "jest": {
   	"transform": {
   		"^.+\\.[t|j]sx?$": "babel-jest"
   	}
   }
   ```

	4.7.2 add it to package.json file after scripts/before keywords

	4.7.3 add file babel.config.json

	4.7.4 add to file info from the web-site above from description for Create babel.config.json configuration file:

   ```
	 {
	    "presets": ["@babel/preset-env"]
  	 }
   ```
   
4.8 Connect and setup library for more readable loges view (log4js):

4.8.1 Install log4j:
   
    `npm install log4js`

4.8.2 Add next code to the file logger.js (into src> utils> logger.js):
```
import log4js from 'log4js';

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[[%p]%] [%d] %f{1} : %l - %m%n'
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'info',
            enableCallStack: true
        }
    }
});

const logger = log4js.getLogger();

logger.level = 'debug';

export default logger;

```

4.8.3 Import logger settings to the test, add on the top of the text next info:

`import log from '../utils/logger';`

4.8.4 With installed lo4j, it's became available to use new methods of printing info to the console instead of using default console.log in JS or etc  in other languages, e.g:

`log.info("Start login test");`
   
`log.error("Some error");`
	
`log.debug("Some debug message");`
	
`log.fatal("Driver fails");`

4.9 Test data JSON-files dependencies set-up

4.9.1 Add separate file with test data to the folder with tests (e.g. LoginTestDta.json, testData.csv, testData.db).

4.9.2 Add separate file 'jsonFileReader.js' with fileFormatReader info to the src>utils folder.

4.9.3 Add info to the 'jsonFileReader.js':

```
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
```

4.9.4 Import readerFile settings to the test, add on the top of the text next info:

`import readJsonFile from '../utils/jsonFileReader';`

4.9.5 In this test (e.g. 'loginTest') declare a variable for calling test data from the test data file:

`const loginInfo = await readJsonFile('./src/tests/LoginTestData.json');`

4.9.6 With such setting, it's available to set test data like:
`loginInfo.username`, `loginInfo.password` instead of declaring constant and value for it and using it in each test like `const username = "TestUsername"`, `const password = "TestPassword"` ets

4.10 Test data CSV-files dependencies set-up:

4.10.1 Add separate file with test data to the folder with tests (e.g. testData.csv).

4.10.2 Add separate file 'csvFileReader.js' with fileFormatReader info to the src>utils folder.

4.10.3 Add info to the 'csvFileReader.js':

```
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
```

4.10.4 Import readerFile settings to the test, add on the top of the text next info:

`import readCsv from '../utils/csvReader';`

4.10.5 In this test (e.g. 'loginTest') declare a variable for calling test data from the test data file:

`const loginInfo = await readCsv('./src/tests/LoginTestData.csv');`

4.10.6 With such setting, it's available to set test data like:

`loginInfo.username`, `loginInfo.password` (the same as with json data described in step above).


4.11 Test data from DB-dta dependencies set-up. For this add info to the 'dbReader.js':

```
import { Database } from 'sqlite3';
import { open } from 'sqlite';

async function readSqlite(source) {
    const db = await open({
        filename: source,
        driver: Database
    });

    try {
        const row = await db.get('SELECT username, password FROM LoginInfo WHERE username = "Admin"');
        return row;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await db.close();
    }
}
export default readSqlite;
```

*****************************

Selenium powershell/bash useful commands notes:
//to run 1 test you need to perform in powershell command:
    npm test yourtestname.js
