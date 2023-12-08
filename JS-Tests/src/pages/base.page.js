import { WebDriverInstance } from '../core/driver-instance';
import { By, Key } from 'selenium-webdriver';

export class BasePage {
    constructor() {
        this.driver = WebDriverInstance.getDriver();
    }

    async getPageTitle() {
        return await this.driver.getTitle();
    }

    async getPageUrl() {
        return await this.driver.getCurrentUrl();
    }

    async getElementText(elementLocator){
        return await this.driver.findElement(elementLocator).getText();
    }

    async isDisplayedElement(elementLocator){
        return await this.driver.findElement(elementLocator).isDisplayed();
    }
    async isEnabledElement(elementLocator){
        return await this.driver.findElement(elementLocator).isEnabled();
    }

    async navigationTo(elementLocator) {
        return await this.driver.findElement(elementLocator).click();
    }

    async saveBtnClick(elementLocator) {
        return await this.driver.findElement(elementLocator).click();
    }

    async pageRefresh() {
        return await this.driver.navigate().refresh();
    }

    async testSleep() {
        await new Promise(r => setTimeout(r, 1000))
    }

    async findElementByXpath(elementLocator) {
        return await this.driver.findElement(By.xpath(elementLocator))
    }

    async findElement(elementLocator) {
        return await this.driver.findElement(elementLocator)
    }

    async eraseField(field) {
        await field.sendKeys(Key.CONTROL + "a");
        await field.sendKeys(Key.BACK_SPACE);
    }

    async fieldsFilling(foundField,fieldData) {
        await this.eraseField(foundField);
        await this.driver.actions()
            .sendKeys(foundField,fieldData)
            .perform();//put data to the field
    }

    async fieldsValuesCheck(foundField) {
        let actual = await foundField.getAttribute("value");
        console.log(actual);
        return actual;
    }
}
