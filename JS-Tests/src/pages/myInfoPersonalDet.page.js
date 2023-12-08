import {By } from 'selenium-webdriver';
import { BasePage } from '../pages/base.page';

export class MyInfoPersonalDetPage extends BasePage {
    constructor() {
        super();
        this.myInfoLocator = By.xpath("//a[@href = '/web/index.php/pim/viewMyDetails']");
        this.myInfoContDetLocator = By.xpath("//a[@href='/web/index.php/pim/contactDetails/empNumber/7']");
        this.myCountryFieldInputLocator = By.xpath("//div[@class='oxd-select-text oxd-select-text--active']//div[@class='oxd-select-text-input']");
        this.mySaveBtnLocator = By.xpath("//div[@class='orangehrm-edit-employee-content']/..//button[@type='submit']");
        this.mytoaster1AppearenceLocator = By.xpath("//div[@id='oxd-toaster_1']//div[@aria-live='assertive']");
        this.firstXpathPart = "//div[label[contains(., '";
        this.thirdXpathPart = "')]]//following-sibling::div//input[contains(@class,'oxd-input oxd-input--active')]";
        this.selectedCountry = By.xpath("//div[@class='oxd-form-row']//div[@class= 'oxd-select-text-input']");
        this.listItem = By.xpath("//div[@role= 'listbox']//span[text()= 'Ukraine']");

        this.fieldsArray = [
            "Street 2",
            "State/Province",
            "Home",
            "Street 1",
            "City",
            "Work Email",
            "Work",
            "Mobile",
            "Other Email",
            "Zip/Postal Code"
        ];
    }

        async fieldsFillingGettingValue(fieldLabel=null,fieldData=null) {
            let locatorOfSomeField = this.firstXpathPart + fieldLabel + this.thirdXpathPart;
            let foundField = await this.findElement(By.xpath(locatorOfSomeField));
            if (fieldData != null){
                await this.fieldsFilling(foundField,fieldData)
            }
            else {
                return await this.fieldsValuesCheck(foundField)
            }
        }

        async selectCountry() {
            await this.testSleep(1000);
            await this.driver.findElement(this.selectedCountry).click();
            await this.testSleep(1000);
            await this.driver.findElement(this.listItem).click();
            await this.testSleep(1000);
        }

        async toastWait() {
            await this.driver.wait(this.driver.findElement(this.mytoaster1AppearenceLocator));
        }
}
