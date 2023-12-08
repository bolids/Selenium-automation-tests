
import { expect, jest, it, afterEach, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('First Selenium Tests - Auth to App and check page name and url', () => {
    let driver;

    /*beforeAll(async () => {
        let options = new Options();

        driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();

        await driver.manage().setTimeouts({ script: 60000 });
        await driver.manage().setTimeouts({ implicit: 10000 });
        // await driver.manage().window().maximize();
    });
    */


    afterAll(async () => {/*
        driver.manage().deleteCookieNamed('orangehrm'); // Deletes the specific cookie according to the Name
        //driver.manage().deleteAllCookies(); // Deletes all the cookies
        await driver.quit();*/

    }, 20000);

    beforeEach(async () => {
        // Arrange
        let options = new Options();

        driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();
        jest.setTimeout(60000);
        await driver.manage().setTimeouts({ script: 60000 });
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
    });

    afterEach(async () => {/*
        try {
            await driver.sleep(5000); //timeout via sleep for test result visibility and catching possible error?
        }
        catch (err) {
            console.log(err);
        }
        finally {
            // console.log('You have reached the end of execution!')
        }*/

        await driver.quit();
    });

    it('Login Test and reset password FE worm validation', async () => {
        // Arrange
        const userNameInputLocator = "//input[@name='username' and @placeholder='Username']";
        const userPasswordInputLocator = "//input[@name='password' and @placeholder='Password']";
        const loginButtonLocator = "//button[@type='submit' and contains(normalize-space(), 'Login')]";

        const textLocator = "//span[@class='oxd-topbar-header-breadcrumb']//h6[contains(., 'Dashboard')]";

        const forgotPasswordLocator = "//p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']";
        const forgotPasFormNameLocator = "//form[h6[contains(., 'Reset Password')]]/h6";
        const usernameResetPFieldLocator = "//div[@class='orangehrm-forgot-password-wrapper']//input[@name='username']";
        const cancelBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Cancel ')]";
        const submitBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Reset Password ')]";
        const resetPasFormNameLocator = "//div[h6[contains(., 'Reset Password link sent successfully')]]/h6";

        const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        const userName = "Admin";
        const userPassword = "admin123";
        const expectedTitle = "OrangeHRM";
        const expectedURL = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        const expectedText = "Dashboard";
        const expForgPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode";
        const expForgPasFormName = "Reset Password";
        const expUsernameResetPFieldD = "True"; //field is displayed
        const expUsernameResetPFieldE = "True"; //field is enabled
        const expResetPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset";
        const expResetPasFormName = "Reset Password link sent successfully"

        // Act
        await driver.get(baseURL);
        await driver.findElement(By.xpath(forgotPasswordLocator)).click(); //navigate to forgot password
        const actualForgPasURL = await driver.getCurrentUrl(); //get Forgot password page for validation
        const actualtForgPasFormName = await driver.findElement(By.xpath(forgotPasFormNameLocator)).getText();// get form name for “Reset Password”
        //await new Promise(r => setTimeout(r, 2000)); //sleep for visual check of the page validation
        await driver.navigate().back();

        await driver.findElement(By.xpath(userNameInputLocator)).sendKeys(userName);
        await driver.findElement(By.xpath(userPasswordInputLocator)).sendKeys(userPassword);
        await driver.findElement(By.xpath(loginButtonLocator)).click();

        const actualTitle = await driver.getTitle();
        const actualURL = await driver.getCurrentUrl();
        const actualText = await driver.findElement(By.xpath(textLocator)).getText();

        // Assert
        expect(expForgPasURL).toBe(actualForgPasURL); //is expected Forgot password page url is equeal to actual?!
        expect(expForgPasFormName).toBe(actualtForgPasFormName); // is the form name is “Reset Password”??

        expect(expectedTitle).toBe(actualTitle);
        expect(expectedURL).toBe(actualURL);

        expect(expectedText).toBe(actualText);
        // await driver.quit();
    }, 20000)

    it('Reset Password Test', async () => {
        // Arrange
        const forgotPasswordLocator = "//p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']";
        const forgotPasFormNameLocator = "//form[h6[contains(., 'Reset Password')]]/h6";
        const usernameResetPFieldLocator = "//div[@class='orangehrm-forgot-password-wrapper']//input[@name='username']";
        const cancelBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Cancel ')]";
        const submitBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Reset Password ')]";
        const resetPasFormNameLocator = "//div[h6[contains(., 'Reset Password link sent successfully')]]/h6";

        const userName = "Admin";
        const expForgPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode";
        const expForgPasFormName = "Reset Password";
        const expUsernameResetPFieldD = "True"; //field is displayed
        const expUsernameResetPFieldE = "True"; //field is enabled
        const expResetPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset";
        const expResetPasFormName = "Reset Password link sent successfully"

        // Act
        await driver.get(By.xpath(forgotPasswordLocator)); //navigate to forgot password
q
        const actualTitle = await driver.getTitle();
        const actualURL = await driver.getCurrentUrl();
        const actualText = await driver.findElement(By.xpath(textLocator)).getText();
        const actualForgPasURL = await driver.getCurrent.Url(); //get Forgot password page for validation?!
        const actualtForgPasFormName = await driver.findElement(By.xpath(forgotPasFormNameLocator)).getText();// get form name for “Reset Password”
        let actualUsernameResetPFieldD = await driver.findElement(By.xpath(usernameResetPFieldLocator)).isDisplayed();
        let actualUsernameResetPFieldE = await driver.findElement(By.xpath(usernameResetPFieldLocator)).isEnabled();//field is displayed and enabled
        const actualUserNameValue = await driver.findElement(usernameResetPFieldLocator)
        await driver.actions()
            .sendKeys(actualUserNameValue, "Admin")
            .perform();//put data to the field by keytyping

        await driver.findElement(By.xpath(submitBtnResetPLocator)).click();//submit form with set username
        const actualResetPasURL = await driver.getCurrent.Url(); //check if result of succed restet returns correct info (reset result page url)
        const actualResetPasFormName = await driver.findElement(By.xpath(resetPasFormNameLocator)).getText(); //check if result of succed restet returns correct info (info text on the new result page)

        // Assert
        expect(expectedTitle).toBe(actualTitle);
        expect(expectedURL).toBe(actualURL);
        expect(expectedText).toBe(actualText);
        expect(expForgPasURL).toBe(actualForgPasURL); //is expected Forgot password page url is equeal to actual
        expect(expForgPasFormName).toBe(actualtForgPasFormName); // is the form name is “Reset Password”
        expect(expUsernameResetPFieldD).toBe(actualUsernameResetPFieldD); //field is displayed and enabled --"True"
        expect(expUsernameResetPFieldE).toBe(actualUsernameResetPFieldE); //"True"
        expect(expResetPasURL).toBe(actualResetPasURL);//on correct name form submit correct page and info are returned
        expect(expResetPasFormName).toBe(actualResetPasFormName);
        //await driver.quit();
    });
});
