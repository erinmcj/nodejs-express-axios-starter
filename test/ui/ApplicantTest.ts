import { By, Builder, Capabilities} from 'selenium-webdriver';
import { expect } from 'chai';

import jobRolesResponse from './response.json';

const baseUrl: string = 'http://localhost:3000/';

const tableHeaders: string[] = [
    "Role Name",
    "Location",
    "Capability",
    "Band",
    "Closing Date",
    "Role Status"
]

describe('Applicant UI Test', async () => {
    // This test assumes that the db is populated with values from response.json file
    it('Should display table with correct table headers and data when user navigates to view job roles', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();
    
        const endPoint: string = 'job-roles';
        await driver.get(baseUrl + endPoint);

        const headerRow = await driver.findElement(By.id('jobRolesTableHeaders'));
        const headerCols = await headerRow.findElements(By.css(".headerCol"));
         
        let i = 0;
        for(const col of headerCols) {
            const colText = await col.getText();
            expect(colText).to.equal(tableHeaders[i]);
            i += 1;
        }
        
        i = 0;
        
        const dataRows = await driver.findElements(By.css(".dataRow"));
        for (const row of dataRows) {
            const roleName = await row.findElement(By.css(".roleName"));
            expect(await roleName.getText()).to.equal(jobRolesResponse[i].roleName);

            const roleLocation = await row.findElement(By.css(".roleLocation"));
            expect(await roleLocation.getText()).to.equal(jobRolesResponse[i].location);

            const roleCapability = await row.findElement(By.css(".roleCapability"));
            expect(await roleCapability.getText()).to.equal(jobRolesResponse[i].capability);

            const roleBand = await row.findElement(By.css(".roleBand"));
            expect(await roleBand.getText()).to.equal(jobRolesResponse[i].band);

            const roleClosingDate = await row.findElement(By.css(".roleClosingDate"));
            expect(await roleClosingDate.getText()).to.equal(jobRolesResponse[i].closingDate);

            const roleStatus = await row.findElement(By.css(".roleStatus"));
            expect(await roleStatus.getText()).to.equal("Open"); // only open status jobs should be shown
    
            i += 1;
        }

        await driver.quit();
    });
});