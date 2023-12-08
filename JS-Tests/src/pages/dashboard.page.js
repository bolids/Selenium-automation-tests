import {By } from 'selenium-webdriver';
import { BasePage } from '../pages/base.page';

export class DashboardPage extends BasePage {
    constructor() {
        super();
        this.dashboardTextLocator = By.xpath("//span[@class='oxd-topbar-header-breadcrumb']//h6[contains(., 'Dashboard')]");
    }
}
