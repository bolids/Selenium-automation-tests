export class WebDriverInstance {
    static driver = null;

    static getDriver() {
        if (!this.driver) {
            throw new Error('Driver is not initialized');
        }
        return this.driver;
    }

    static setDriver(driverInstance) {
        this.driver = driverInstance;
    }
}