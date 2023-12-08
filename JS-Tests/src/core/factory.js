import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import { Builder } from 'selenium-webdriver';

export class WebDriverFactory {

    async getDriver(browser) {
        let driver;
        switch (browser) {
            case "chrome":
                driver = await this.getChromeDriver();
                break;
            case "firefox":
                driver = await this.getFirefoxDriver();
                break;
            default:
                throw new Error(`Browser "${browser}" is not available`);        
        }

        return driver;
    }

    async getChromeDriver() {
        let options = new ChromeOptions();
        //...some options here
        const driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();

        return driver;
    }

    async getFirefoxDriver() {
        let options = new FirefoxOptions();
        //...some options here
        const driver = await new Builder()
            .setFirefoxOptions(options)
            .forBrowser("firefox")
            .build();

        return driver;
    }
}