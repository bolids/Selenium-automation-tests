import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';
import { DashboardPage } from '../pages/dashboard.page';
import { MyInfoPersonalDetPage } from '../pages/myInfoPersonalDet.page';
import log from '../utils/logger';
import readJsonFile from '../utils/jsonFileReader';

let loginPage;
let loginSteps;
let dashboardPage;
let myInfoPersonalDetPage;

describe('Auth to app > My contact details updating and updates checking', () => {

    beforeEach(async () => {
        loginPage = new LoginPage();
        loginSteps = new LoginSteps();
        dashboardPage = new DashboardPage();
        myInfoPersonalDetPage = new MyInfoPersonalDetPage();
    });

    it('Contact details updating and verifying test', async () => {
        // Arrange
        const loginInfo = await readJsonFile('./src/tests/LoginTestData.json');
        log.debug("User name:" + loginInfo.username);
        log.debug("User pass:" + loginInfo.password);

        const fieldsDataArray = await readJsonFile('./src/tests/MyPersDetFieldsTestData.json');
        const fieldsArray = myInfoPersonalDetPage.fieldsArray
        const expectedCountry = "Ukraine";

        // Act
        log.info("Open URL");
        await loginPage.open();
        await loginSteps.login(loginInfo.username, loginInfo.password);
        log.info("Set user name and password: " + loginInfo.username +  ", " + loginInfo.password);

        log.info("Navigation to myInfo")
        await myInfoPersonalDetPage.navigationTo(myInfoPersonalDetPage.myInfoLocator);
        log.info("Navigation from myInfo to Contact Details Page")
        await myInfoPersonalDetPage.navigationTo(myInfoPersonalDetPage.myInfoContDetLocator);
        await myInfoPersonalDetPage.testSleep(3000);

        log.info("Fields filling")
        for (let i = 0; i < fieldsArray.length; i++) {
          await myInfoPersonalDetPage.fieldsFillingGettingValue(fieldsArray[i],fieldsDataArray[i])
        }

        log.info("Country Dropdown: select and set value")
        await myInfoPersonalDetPage.selectCountry();

        log.info("Submit filled in form page");
        await myInfoPersonalDetPage.saveBtnClick(myInfoPersonalDetPage.mySaveBtnLocator);
        log.info("Toast waiting appearance after submitting form");
        await myInfoPersonalDetPage.toastWait();
        log.info("Page refresh");
        await myInfoPersonalDetPage.pageRefresh();
        log.info("Check if dropdown element is displayed after page refresh");
        await myInfoPersonalDetPage.isDisplayedElement(myInfoPersonalDetPage.selectedCountry);
        await myInfoPersonalDetPage.testSleep(1000);

        log.info("Check fields' values");
        for (let i = 0; i < fieldsArray.length; i++) {
            let actual = await myInfoPersonalDetPage.fieldsFillingGettingValue(fieldsArray[i])
            // Assert for fields saved data
            expect(fieldsDataArray[i]).toBe(actual);
        }

        let actualCountryFieldValue = await myInfoPersonalDetPage.getElementText(myInfoPersonalDetPage.myCountryFieldInputLocator);
        log.info("ActualCountryFieldValue: " + actualCountryFieldValue);
        expect(expectedCountry).toBe(actualCountryFieldValue); //assert for selected/saved country
    });
});
