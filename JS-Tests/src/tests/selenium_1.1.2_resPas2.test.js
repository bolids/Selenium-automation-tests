
import { expect, jest, it, afterEach, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Builder, By, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('First Selenium Tests - Auth to App and check page name and url', () => {
    let driver;

    beforeEach(async () => {
        let options = new Options();

        driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();
        jest.setTimeout(60000); //test run is failed by default timout 5000 without this additional timeout and 20000ms timeout in the end of ResetPassword test
        await driver.manage().setTimeouts({ script: 60000 });
        await driver.manage().setTimeouts({ implicit: 10000 });
        await driver.manage().window().maximize();
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('Reset password FE worm validation and BE check', async () => {
        // Arrange
        const forgotPasswordLocator = "//p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']";
        const forgotPasFormNameLocator = "//form[h6[contains(., 'Reset Password')]]/h6";
        const usernameResetPFieldLocator = "//div[@class='orangehrm-forgot-password-wrapper']//input[@name='username']";
        const cancelBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Cancel ')]";
        const submitBtnResetPLocator = "//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Reset Password ')]";
        const resetPasFormNameLocator = "//div[h6[contains(., 'Reset Password link sent successfully')]]/h6";
        const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        const expForgPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode";
        const expForgPasFormName = "Reset Password";
        const expResetPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset";
        const expResetPasFormName = "Reset Password link sent successfully"

        // Act
        await driver.get(baseURL);

        await driver.findElement(By.xpath(forgotPasswordLocator)).click(); //navigate to forgot password
        const actualForgPasURL = await driver.getCurrentUrl(); //get Forgot password page for validation
        const actualtForgPasFormName = await driver.findElement(By.xpath(forgotPasFormNameLocator)).getText();// get form name for “Reset Password”
        //await new Promise(r => setTimeout(r, 2000)); //sleep for visual check of the page validation

        const actualUsernameResetPFieldD = await driver.findElement(By.xpath(usernameResetPFieldLocator)).isDisplayed();//field is displayed and enabled
        console.log(actualUsernameResetPFieldD.toString()); // Expected output
        const actualUsernameResetPFieldE = await driver.findElement(By.xpath(usernameResetPFieldLocator)).isEnabled();
        const actualCancelBtnResetPD = await driver.findElement(By.xpath(cancelBtnResetPLocator)).isDisplayed()//btn 'Cansel' is displayed and enabled
        const actualCancelBtnResetPE = await driver.findElement(By.xpath(cancelBtnResetPLocator)).isEnabled();
        const actualsubmitBtnResetPD = await driver.findElement(By.xpath(submitBtnResetPLocator)).isDisplayed();//btn 'Reset' is displayed and enabled
        const actualsubmitBtnResetPE = await driver.findElement(By.xpath(submitBtnResetPLocator)).isEnabled();
        const actualUserNameValue = await driver.findElement(By.xpath(usernameResetPFieldLocator));
        await driver.actions()
            .sendKeys(actualUserNameValue, "Admin")
            .perform();//put data to the field
        await driver.findElement(By.xpath(submitBtnResetPLocator)).click();//submit
        const actualResetPasURL = await driver.getCurrentUrl();
        const actualResetPasFormName = await driver.findElement(By.xpath(resetPasFormNameLocator)).getText();

        await driver.navigate().to(baseURL); //back navigation to the login page

        // Assert
        expect(expForgPasURL).toBe(actualForgPasURL); //is expected Forgot password page url is equeal to actual?!
        expect(expForgPasFormName).toBe(actualtForgPasFormName); // is the form name is “Reset Password”??
        //await new Promise(r => setTimeout(r, 2000)); //temporary required sleep vaiting page loading and validation expected
        expect(actualUsernameResetPFieldD).toBe(true); //field is displayed --"True"
        expect(actualUsernameResetPFieldE).toBe(true);//field enabled
        expect(actualCancelBtnResetPD).toBe(true);//btn 'Cansel' is displayed
        expect(actualCancelBtnResetPE).toBe(true);// btn 'Cansel' is enabled
        expect(actualsubmitBtnResetPD).toBe(true);//btn 'Reset' is displayed
        expect(actualsubmitBtnResetPE).toBe(true);//btn 'Reset' is enabled
        expect(expResetPasURL).toBe(actualResetPasURL);//ocorrect info is are returned on reset password sumbit with inputed valid data
        expect(expResetPasFormName).toBe(actualResetPasFormName);

        //await driver.quit();
    }, 20000);

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
