import {By } from 'selenium-webdriver';
import { BasePage } from '../pages/base.page';

export class ResetPasswordSuccessPage extends BasePage {
    constructor() {
        super();
        this.resetPasSuccessFormNameLocator = By.xpath("//div[h6[contains(., 'Reset Password link sent successfully')]]/h6");
    }
}
