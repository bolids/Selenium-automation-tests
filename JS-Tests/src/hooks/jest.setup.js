import { beforeEach } from '@jest/globals';
import { WebDriverFactory } from '../core/factory';
import { WebDriverInstance } from '../core/driver-instance';

beforeEach(async () => {
    const driver = await new WebDriverFactory().getDriver("chrome");
    await driver.manage().setTimeouts({script: 60000});
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.manage().window().maximize();

    WebDriverInstance.setDriver(driver);
});

afterEach(async () => {
    await WebDriverInstance.getDriver().quit();
});