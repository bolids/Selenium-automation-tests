
import { expect, jest, it, afterEach, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { Builder, By, Key, until, Select, logging, WebElement } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

describe('Auth to app > My contact details updating and updates checking', () => {
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

    it('Contact details updating and verifying test', async () => {
        // Arrange
        const userNameInputLocator = "//input[@name='username' and @placeholder='Username']";
        const userPasswordInputLocator = "//input[@name='password' and @placeholder='Password']";
        const loginButtonLocator = "//button[@type='submit' and contains(normalize-space(), 'Login')]";

        const myInfoLocator = "//a[@href = '/web/index.php/pim/viewMyDetails']";
        const myInfoContDetLocator = "//a[@href='/web/index.php/pim/contactDetails/empNumber/7']";
        const myCountryCaretLocator = "//div[@class='orangehrm-edit-employee-content']//following-sibling::i[@class='oxd-icon bi-caret-down-fill oxd-select-text--arrow']";
        const myCountryFieldInputLocator = "//div[@class='oxd-select-text oxd-select-text--active']//div[@class='oxd-select-text-input']";
        const myCountryFieldDDLocator = "//div[@class='oxd-select-text oxd-select-text--focus']//div[@class='oxd-select-text-input']";
        const myCountryFieldDropDLocator = "//div[@class='oxd-select-text-input']";
        const myCountryItemLocator1 = "//div[@role='listbox']//*[text() = 'Algeria']";
        const myCountryItemLocator2 = "//div[@role='listbox']//span";
        const myCountryFieldLocator = "//div[@class='oxd-select-text oxd-select-text--active']"
        const myCountryCaretLocatorUp = "//div[@class='orangehrm-edit-employee-content']//following-sibling::i[@class='oxd-icon bi-caret-up-fill oxd-select-text--arrow']";
        const mySaveBtnLocator = "//div[@class='orangehrm-edit-employee-content']/..//button[@type='submit']";
        const mytoaster1AppearenceLocator = "//div[@id='oxd-toaster_1']//div[@aria-live='assertive']";
        const firstXpathPart = "//div[label[contains(., '";
        const thirdXpathPart = "')]]//following-sibling::div//input[contains(@class,'oxd-input oxd-input--active')]";
        const fieldsDataArray = [
            "TestingStreet2",
            "TestProvince",
            "+381111111111",
            "TestingStreet1",
            "TestCity",
            "admin@example.com",
            "+381111111110",
            "+381111111112",
            "oemail@test.com",
            "65424"
        ];
        const fieldsArray = [
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

        const baseURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        const userName = "Admin";
        const userPassword = "admin123";
        const searchCountryPattern = "uu";
        const expectedCountry = "Ukraine";

        // Act
        await driver.get(baseURL);
        await driver.findElement(By.xpath(userNameInputLocator)).sendKeys(userName);
        await driver.findElement(By.xpath(userPasswordInputLocator)).sendKeys(userPassword);
        await driver.findElement(By.xpath(loginButtonLocator)).click();
        await new Promise(r => setTimeout(r, 2000)); //sleep for visul test
        await driver.findElement(By.xpath(myInfoLocator)).click();
        await driver.findElement(By.xpath(myInfoContDetLocator)).click();

        await new Promise(r => setTimeout(r, 2000));

        for (let i = 0; i < fieldsArray.length; i++) {
            var locatorOfSomeField = firstXpathPart + fieldsArray[i] + thirdXpathPart;
            var foundField = driver.findElement(By.xpath(locatorOfSomeField))
            await foundField.sendKeys(Key.CONTROL + "a");
            await foundField.sendKeys(Key.BACK_SPACE);
            await driver.actions()
                .sendKeys(foundField, fieldsDataArray[i])
                .perform();//put data to the field
        }

        await new Promise(r => setTimeout(r, 2000));
        let cdd = await driver.findElement(By.xpath(myCountryCaretLocator));
        await cdd.click();
        driver.actions().sendKeys(cdd, searchCountryPattern, Key.ENTER).perform();
        await cdd.click();

        await driver.findElement(By.xpath(mySaveBtnLocator)).click();
        //await new Promise(r => setTimeout(r, 3000)); //workaround for waiting untill alert is disapeared
        await driver.wait(driver.findElement(By.xpath(mytoaster1AppearenceLocator)));//toast waiting appearance after submitting form

        await driver.navigate().refresh();
        await new Promise(r => setTimeout(r, 2000));

        for (let i = 0; i < fieldsArray.length; i++) {
            var locatorOfSomeField = firstXpathPart + fieldsArray[i] + thirdXpathPart;
            var foundField = driver.findElement(By.xpath(locatorOfSomeField))
            var actual = await foundField.getAttribute("value");
            console.log(actual);
            // Assert for fields saved data
            expect(fieldsDataArray[i]).toBe(actual);
        }
        let actualCountryFieldValue = await driver.findElement(By.xpath(myCountryFieldInputLocator)).getText();
        console.log(actualCountryFieldValue);
        expect(expectedCountry).toBe(actualCountryFieldValue); //assert for selected/saved country

        //await driver.quit();
    }, 60000);

});
