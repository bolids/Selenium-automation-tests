import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';
import { DashboardPage } from '../pages/dashboard.page';

let loginPage;
let loginSteps;
let dashboardPage;

describe('1st Selenium test_Page object', () => {

    beforeEach(async () => {
        loginPage = new LoginPage();
        loginSteps = new LoginSteps();
        dashboardPage = new DashboardPage();
    });

    it('Login Test', async () => {
        // Arrange
        const userName = "Admin";
        const userPassword = "admin123";
        const expectedTitle = "OrangeHRM";
        const expectedURL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        const expectedText = "Dashboard";

        // Act
        await loginPage.open();
        //loginPage.setUserName(userName);
        //loginPage.setUserPassword(userPassword);
        //await loginPage.pressLoginButton();
        await loginSteps.login(userName, userPassword);

        const actualTitle = await loginPage.getPageTitle();
        console.log(actualTitle);
        const actualURL = await loginPage.getPageUrl();
        console.log(actualURL);

        const actualText = await dashboardPage.getElementText(dashboardPage.dashboardTextLocator);
        console.log(actualText);
        //loginSteps.commonStep(); //just testing of action described in the base.step

        // Assert
        expect(expectedTitle).toBe(actualTitle);
        expect(expectedURL).toBe(actualURL);
        expect(expectedText).toBe(actualText);
    });  
});
