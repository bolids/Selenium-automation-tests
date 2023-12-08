import { expect, it, beforeEach } from '@jest/globals';
import { LoginPage } from '../pages/login.page';
import { ResetPasswordPage } from '../pages/resetPassw.page';
import { ResetPasswordSteps } from '../steps/resetPassw.step';
import { ResetPasswordSuccessPage } from '../pages/resetPasswSuccess.page';
import { ResetPasswordSuccessSteps } from '../steps/resetPasswSuccess.step';

let loginPage;
let resetPasswordPage;
let resetPasswordSteps;
let resetPasswordSuccessPage;
let resetPasswordSuccessSteps;

describe('Selenium Tests - Auth to App', () => {
    beforeEach(async () => {
        loginPage = new LoginPage();
        resetPasswordPage = new ResetPasswordPage();
        resetPasswordSteps = new ResetPasswordSteps();
        resetPasswordSuccessPage = new ResetPasswordSuccessPage();
        resetPasswordSuccessSteps = new ResetPasswordSuccessSteps();
    });

    it('Reset password FE worm validation - PageObject', async () => {
        // Arrange
        const expResetPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode";
        const expResetPasFormName = "Reset Password";

        // Act
        await loginPage.open();
        await loginPage.pressForgotPasswBtn(); //click on Forgot passw btn and navigate to reset password page

        const actualForgPasURL = await resetPasswordPage.getPageUrl();
        const actualtForgPasFormName = await resetPasswordPage.getElementText(resetPasswordPage.resetPasFormNameLocator);
        console.log("ACTUAL FormName: " + actualtForgPasFormName);
        const actualUsernameResetPFieldD = await resetPasswordPage.isDisplayedElement(resetPasswordPage.usernameResetPFieldLocator)
        const actualUsernameResetPFieldE = await resetPasswordPage.isEnabledElement(resetPasswordPage.usernameResetPFieldLocator);
        const actualCancelBtnResetPD = await resetPasswordPage.isDisplayedElement(resetPasswordPage.cancelBtnResetPLocator);
        const actualCancelBtnResetPE = await resetPasswordPage.isEnabledElement(resetPasswordPage.cancelBtnResetPLocator);
        const actualsubmitBtnResetPD = await resetPasswordPage.isDisplayedElement(resetPasswordPage.submitBtnResetPLocator);
        const actualsubmitBtnResetPE = await resetPasswordPage.isEnabledElement(resetPasswordPage.submitBtnResetPLocator);
        console.log("isEnabledCheckSubmitBtn: " + actualsubmitBtnResetPE.toString());

        // Assert
        expect(expResetPasURL).toBe(actualForgPasURL); //is expected Forgot password page url is equeal to actual
        expect(expResetPasFormName).toBe(actualtForgPasFormName); // is the form name is “Reset Password”
        expect(actualUsernameResetPFieldD).toBe(true); //field is displayed --"True"
        expect(actualUsernameResetPFieldE).toBe(true);//field enabled
        expect(actualCancelBtnResetPD).toBe(true);//btn 'Cansel' is displayed
        expect(actualCancelBtnResetPE).toBe(true);// btn 'Cansel' is enabled
        expect(actualsubmitBtnResetPD).toBe(true);//btn 'Reset' is displayed
        expect(actualsubmitBtnResetPE).toBe(true);//btn 'Reset' is enabled
    });

    it('Reset password BE checks - Reset Password Success page checks - PageObject', async () => {
        // Arrange
        const expResetSuccessPasURL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset";
        const expResetPasSuccessFormName = "Reset Password link sent successfully"

        // Act
        await loginPage.open();
        await loginPage.pressForgotPasswBtn(); //click on Forgot passw btn and navigate to reset password page
        await resetPasswordSteps.resetPasswordFormChecks();

        const actualResetPasURL = await resetPasswordSuccessPage.getPageUrl();
        const actualResetPasFormName = await resetPasswordSuccessPage.getElementText(resetPasswordSuccessPage.resetPasSuccessFormNameLocator);
        console.log("ACTUAL FormName: " + actualResetPasFormName);

        // Assert
        expect(expResetSuccessPasURL).toBe(actualResetPasURL);//if input valid data, correct info is returned on reset password sumbit
        expect(expResetPasSuccessFormName).toBe(actualResetPasFormName);//actual form name is equal to the expected
    });
});
