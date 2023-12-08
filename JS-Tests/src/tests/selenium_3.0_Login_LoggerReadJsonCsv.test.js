import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';
import { DashboardPage } from '../pages/dashboard.page';
import log from '../utils/logger';
import readJsonFile from '../utils/jsonFileReader';
import readCsv from '../utils/csvReader';

let loginPage;
let loginSteps;
let dashboardPage;

describe('1st Selenium test_Page object_Logger_readJsonData', () => {

    beforeEach(async () => {
        loginPage = new LoginPage();
        loginSteps = new LoginSteps();
        dashboardPage = new DashboardPage();
    });

    it('Login Test', async () => {
        log.info("Start login test");
        //log.error("Some error")
        //log.debug("Some debug message")
        //log.fatal("Driver fails")

        // Arrange
        const loginInfo = await readJsonFile('./src/tests/LoginTestData.json');
        //const loginInfo = await readCsv('./src/tests/LoginTestData.csv'); //todo: for using data from csv file if it needs
        log.debug("User name:" + loginInfo.username);
        log.debug("User pass:" + loginInfo.password);

        const expectedTitle = "OrangeHRM";
        const expectedURL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        const expectedText = "Dashboard";

        // Act
        log.info("Open URL");
        await loginPage.open();
        await loginSteps.login(loginInfo.username, loginInfo.password);
        log.info("Set user name and password: " + loginInfo.username +  ", " + loginInfo.password);

        const actualTitle = await loginPage.getPageTitle();
        const actualURL = await loginPage.getPageUrl();
        log.info("Actual URL: " + actualURL);
        log.info("Actual Title: " + actualTitle);

        const actualText = await dashboardPage.getElementText(dashboardPage.dashboardTextLocator);
        log.info("Actual Text: " + actualText);

        // Assert
        expect(expectedTitle).toBe(actualTitle);
        expect(expectedURL).toBe(actualURL);
        expect(expectedText).toBe(actualText);
    });
});
