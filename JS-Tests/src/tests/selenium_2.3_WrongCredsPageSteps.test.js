import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';

let loginPage;
let loginSteps;

describe('Selenium Test - Auth to App', () => {
    beforeEach(async () => {
        loginPage = new LoginPage();
        loginSteps = new LoginSteps();
    });

    it('Login Test - Auth creads validation', async () => {
        // Arrange
        const expCredsValidText = "Invalid credentials";
        let actualCredsValidationResultInfo = null;
        const creds = [
            ["wrongName", "WrongPass"],
            ["Admin", "WrongPass"],
            ["wrongName", "admin123"],
            //["Admin", "admin123"]
        ];

        // Act
       await loginPage.open();

       for (let i = 0; i < creds.length; i++) {
            await loginSteps.login(creds[i][0],creds[i][1]);
            const actualURL = await loginPage.getPageUrl();
            console.log(actualURL);
            try {
                actualCredsValidationResultInfo = await loginPage.isDisplayedElement(loginPage.actualCredsValidationResultInfoLocator);
            }
            catch (error) {
                console.log(error);
                actualCredsValidationResultInfo = false;
            }

            console.log("Is Displayed validation text: " + actualCredsValidationResultInfo.toString());

            if (actualCredsValidationResultInfo) {
                let actualCredsValidationResultInfoText = await loginPage.getElementText(loginPage.actualCredsValidationResultInfoLocator);
                console.log("Validation text is: " + actualCredsValidationResultInfoText);
                expect(expCredsValidText).toBe(actualCredsValidationResultInfoText);  //Asseert
            }
            else {
                console.log("Invalid credentials window doesn't exist")
            }

            //Assert
            expect(actualCredsValidationResultInfo).toBe(true);
        }
    });
});
