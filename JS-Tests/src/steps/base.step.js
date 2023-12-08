import { LoginPage } from '../pages/login.page';
import { ResetPasswordPage } from '../pages/resetPassw.page';
import { DashboardPage } from '../pages/dashboard.page';
import { MyInfoPersonalDetPage } from '../pages/myInfoPersonalDet.page';
import log from '../utils/logger';

export class BaseStep {
    constructor() {
        this.loginPage = new LoginPage();
        this.resetPasswordPage = new ResetPasswordPage();
        this.dashboardPage = new DashboardPage();
        this.myInfoPersonalDetPage = new MyInfoPersonalDetPage();
    }

    async commonStep() {
        console.log("Not implemented");
    }
}
