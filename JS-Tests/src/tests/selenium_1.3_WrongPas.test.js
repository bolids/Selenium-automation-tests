
import { expect, jest, it, afterEach, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('3rd Selenium Test - Auth to App', () => {
    let driver;

    beforeEach(async () => {
        let options = new Options();

        driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();
        await driver.manage().setTimeouts({ script: 60000 });
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('Login Test', async () => {
        // Arrange
        const userNameInputLocator = "//input[@name='username' and @placeholder='Username']";
        const userPasswordInputLocator = "//input[@name='password' and @placeholder='Password']";
        const loginButtonLocator = "//button[@type='submit' and contains(normalize-space(), 'Login')]";
        const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        const actualPasswValidationResultInfoLocator = "//div[@class='oxd-alert-content oxd-alert-content--error']";
        const expCredsValidText = "Invalid credentials";
        let actualPasswValidationResultInfo = null;
        const creds = [
            ["wrongName", "WrongPass"],
            ["Admin", "WrongPass"],
            ["wrongName", "admin123"],
            //["Admin", "admin123"] --f valid creds, can be uncommented and used for assert checking
        ];

        // Act
        await driver.get(baseURL);

        for (var i = 0; i < creds.length; i++) {
            await driver.findElement(By.xpath(userNameInputLocator)).sendKeys(creds[i][0]);
            await driver.findElement(By.xpath(userPasswordInputLocator)).sendKeys(creds[i][1]);
            await driver.findElement(By.xpath(loginButtonLocator)).click();
            let actualURL = await driver.getCurrentUrl();
            try {
                actualPasswValidationResultInfo = await driver.findElement(By.xpath(actualPasswValidationResultInfoLocator)).isDisplayed();
            }
            catch {
                actualPasswValidationResultInfo = false;
            }
            console.log("Is Displayed validation text: " + actualPasswValidationResultInfo.toString());
            if (actualPasswValidationResultInfo) {
                let actualPasswValidationResultInfoText = await driver.findElement(By.xpath(actualPasswValidationResultInfoLocator)).getText();
                console.log("Validation text is: " + actualPasswValidationResultInfoText);
                expect(expCredsValidText).toBe(actualPasswValidationResultInfoText);  //Asseert
            }
            else {
                console.log("Invalid credentials window doesn't exist")
            }
            //Asseert
            expect(actualPasswValidationResultInfo).toBe(true);
        }

        //await driver.quit();
    }, 60000);
});
