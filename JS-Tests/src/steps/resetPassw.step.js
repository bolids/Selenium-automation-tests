import { BaseStep } from '../steps/base.step';

export class ResetPasswordSteps extends BaseStep {
    constructor() {
        super();
    }

    async resetPasswordFormChecks() {
        await this.resetPasswordPage.setNameToTheField();
        await this.resetPasswordPage.pressResetButton();
    }
}