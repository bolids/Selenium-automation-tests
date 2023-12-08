import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';
import log from '../utils/logger';
import readJsonFile from '../utils/jsonFileReader';

let loginPage;
let loginSteps;

describe('Selenium Test - Auth to App', () => {
    beforeEach(async () => {
        loginPage = new LoginPage();
        loginSteps = new LoginSteps();
    });

    it('Login Test - Auth credentials validation', async () => {
        // Arrange
        const expCredsValidText = "Invalid credentials";
        let actualCredsValidationResultInfo = null;

        const creds = await readJsonFile('./src/tests/LoginCredsValidationTestData.json');

        // Act
       log.info("Open URL");
       await loginPage.open();

       log.info("Try to auth with wrong creds");
       for (let i = 0; i < creds.length; i++) {
            await loginSteps.login(creds[i][0],creds[i][1]);
            const actualURL = await loginPage.getPageUrl();
            log.info("Actual URL: " + actualURL);

            log.info("Check if the expected info is displayed for attempt to auth with wrong creds");
            try {
                actualCredsValidationResultInfo = await loginPage.isDisplayedElement(loginPage.actualCredsValidationResultInfoLocator);
            }
            catch (error) {
                log.error("Info: " + error);
                actualCredsValidationResultInfo = false;
            }

            log.info("Is Displayed validation text: " + actualCredsValidationResultInfo.toString());

            if (actualCredsValidationResultInfo) {
                let actualCredsValidationResultInfoText = await loginPage.getElementText(loginPage.actualCredsValidationResultInfoLocator);
                log.info("Validation text is: " + actualCredsValidationResultInfoText);
                expect(expCredsValidText).toBe(actualCredsValidationResultInfoText);  //Assert
            }
            else {
                log.info("Invalid credentials window doesn't exist")
            }

            //Assert
            expect(actualCredsValidationResultInfo).toBe(true);
        }
    });
});
