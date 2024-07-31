import { By, Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';

const baseUrl: string = 'http://localhost:3000/';

describe('Applicant UI Test', async () => {
    it('As an applicant, I am able to see a list of job roles', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
    
        const endPoint: string = 'job-roles';
        await driver.get(baseUrl + endPoint);

        const jobRolesTable = await driver.findElement(By.id('jobRolesTable'));
        const allRows = await jobRolesTable.findElements(By.css('tr'));
        const dataRows = allRows.slice(1); // skip header col row

        expect(dataRows.length).to.equal(7);

        await driver.quit();
    });

    // TO DO
    it('As an applicant, I am able to login', async () => {
        
    })
});