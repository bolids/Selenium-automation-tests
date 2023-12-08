import {By } from 'selenium-webdriver';
import { BasePage } from '../pages/base.page';

export class LoginPage extends BasePage {
    constructor() {
        super();
        this.pageURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

        this.userNameInputLocator = By.xpath("//input[@name='username' and @placeholder='Username']");
        this.userPasswordInputLocator = By.xpath("//input[@name='password' and @placeholder='Password']");
        this.loginButtonLocator = By.xpath("//button[@type='submit' and contains(normalize-space(), 'Login')]");

        this.actualCredsValidationResultInfoLocator = By.xpath("//div[@class='oxd-alert-content oxd-alert-content--error']");
        this.forgotPasswordLocator = By.xpath("//p[@class='oxd-text oxd-text--p orangehrm-login-forgot-header']");
    }

    async open() {
        await this.driver.get(this.pageURL);
    }

    async setUserName(name) {
        await this.driver.findElement(this.userNameInputLocator).sendKeys(name);
    }

    async setUserPassword(password) {
        await this.driver.findElement(this.userPasswordInputLocator).sendKeys(password);
    }

    async pressLoginButton() {
        await this.driver.findElement(this.loginButtonLocator).click();
    }

    async pressForgotPasswBtn() {
        return await this.driver.findElement(this.forgotPasswordLocator).click()
    }
}
