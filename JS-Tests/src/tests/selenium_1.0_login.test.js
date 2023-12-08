
import { expect, jest, it, afterEach, beforeEach } from '@jest/globals';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('First Selenium Tests - Auth to App and check page name and url', () => {
    let driver;

    beforeEach(async () => {
        // Arrange
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
        const textLocator = "//span[@class='oxd-topbar-header-breadcrumb']//h6[contains(., 'Dashboard')]";

        const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        const userName = "Admin";
        const userPassword = "admin123";
        const expectedTitle = "OrangeHRM";
        const expectedURL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        const expectedText = "Dashboard";

        // Act
        await driver.get(baseURL);

        await driver.findElement(By.xpath(userNameInputLocator)).sendKeys(userName);
        await driver.findElement(By.xpath(userPasswordInputLocator)).sendKeys(userPassword);
        await driver.findElement(By.xpath(loginButtonLocator)).click();

        const actualTitle = await driver.getTitle();
        const actualURL = await driver.getCurrentUrl();
        const actualText = await driver.findElement(By.xpath(textLocator)).getText();

        // Assert
        expect(expectedTitle).toBe(actualTitle);
        expect(expectedURL).toBe(actualURL);
        expect(expectedText).toBe(actualText);
        //await driver.quit();
    });
});
