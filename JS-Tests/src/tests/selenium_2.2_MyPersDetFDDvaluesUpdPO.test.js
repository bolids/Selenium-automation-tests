import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { LoginSteps } from '../steps/login.step';
import { DashboardPage } from '../pages/dashboard.page';
import { MyInfoPersonalDetPage } from '../pages/myInfoPersonalDet.page';

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
        const userName = "Admin";
        const userPassword = "admin123";
        const expectedCountry = "Ukraine";

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

        const fieldsArray = myInfoPersonalDetPage.fieldsArray

        // Act
        await loginPage.open();
        await loginSteps.login(userName, userPassword);

        await myInfoPersonalDetPage.navigationTo(myInfoPersonalDetPage.myInfoLocator);
        await myInfoPersonalDetPage.navigationTo(myInfoPersonalDetPage.myInfoContDetLocator);
        await myInfoPersonalDetPage.testSleep(3000);

        //fields filling
        for (let i = 0; i < fieldsArray.length; i++) {
           await myInfoPersonalDetPage.fieldsFillingGettingValue(fieldsArray[i],fieldsDataArray[i])
        }

        await myInfoPersonalDetPage.selectCountry(); //dropdown set value
        await myInfoPersonalDetPage.saveBtnClick(myInfoPersonalDetPage.mySaveBtnLocator); //submit filled in form
        await myInfoPersonalDetPage.toastWait();//toast waiting appearance after submitting form
        await myInfoPersonalDetPage.pageRefresh();

        await myInfoPersonalDetPage.isDisplayedElement(myInfoPersonalDetPage.selectedCountry);
        await myInfoPersonalDetPage.testSleep(1000);

        // check fileds' values
        for (let i = 0; i < fieldsArray.length; i++) {
            let actual = await myInfoPersonalDetPage.fieldsFillingGettingValue(fieldsArray[i])
            // Assert for fields saved data
            expect(fieldsDataArray[i]).toBe(actual);
        }

        let actualCountryFieldValue = await myInfoPersonalDetPage.getElementText(myInfoPersonalDetPage.myCountryFieldInputLocator);
        console.log(actualCountryFieldValue);
        expect(expectedCountry).toBe(actualCountryFieldValue); //assert for selected/saved country
    });
});
