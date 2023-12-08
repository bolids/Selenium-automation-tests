import {By } from 'selenium-webdriver';
import { BasePage } from '../pages/base.page';

export class ResetPasswordPage extends BasePage {
    constructor() {
        super();
        this.resetPasFormNameLocator = By.xpath("//form[h6[contains(., 'Reset Password')]]/h6");
        this.usernameResetPFieldLocator = By.xpath("//div[@class='orangehrm-forgot-password-wrapper']//input[@name='username']");
        this.cancelBtnResetPLocator = By.xpath("//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Cancel ')]");
        this.submitBtnResetPLocator = By.xpath("//div[@class='orangehrm-forgot-password-wrapper']//button[contains(., ' Reset Password ')]");
    }

    async setNameToTheField(userNameField = this.usernameResetPFieldLocator){
        let field = await this.driver.findElement(userNameField)
        return await this.driver.actions().sendKeys(field, "Admin").perform();
    }

    /*//alternative for the sendKeys.perform()
    async setNameToTheField(userNameField = this.usernameResetPFieldLocator) {
        return await this.driver.findElement(userNameField).sendKeys("Admin");
    }*/

    async pressResetButton() {
        await this.driver.findElement(this.submitBtnResetPLocator).click();
    }
}
