import { BaseStep } from '../steps/base.step';
import log from '../utils/logger';

export class LoginSteps extends BaseStep {
    constructor() {
        super();
    }

    async login(userName, userPassword) {
        //await this.loginPage.open();
        await this.loginPage.setUserName(userName);
        await this.loginPage.setUserPassword(userPassword);
        await this.loginPage.pressLoginButton();
    }
}
