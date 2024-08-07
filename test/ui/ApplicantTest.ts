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

    it('As an applicant, I am able to click on a job role and see the details', async () => {
        const driver = new Builder().
        withCapabilities(Capabilities.chrome()).
        build();

        const endPoint: string = 'job-roles';
        await driver.get(baseUrl + endPoint);
        
        const element = driver.findElement(By.id('roleNameInList'));
        driver.executeScript("arguments[0].scrollIntoView(true);", element);

        await driver.findElement(By.linkText("Software Engineer")).click();

        const endPoint2: string = 'job-roles/1';
        await driver.get(baseUrl + endPoint2);
        
       const name = await driver.findElement(By.id('roleName')).getText();
        expect(name).to.equal('Software Engineer');

        await driver.quit();

    });
});