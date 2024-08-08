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

    it('As an applicant, when I login, I am taken to a page where I can see a list of job roles', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        await driver.get(baseUrl);

        await driver.findElement(By.id('username')).sendKeys('user1');
        await driver.findElement(By.id('password')).sendKeys('user1');
        await driver.findElement(By.id('submit')).click();
   
        const redirectUrl = await driver.getCurrentUrl();

        await driver.quit();

        expect(redirectUrl).to.equal(baseUrl + 'job-roles');        
    
    })

    it('As an applicant, when I type in wrong credentials I am prompted to try again', async () => {
        const driver = new Builder().
            withCapabilities(Capabilities.chrome()).
            build();

        const loginUrl = 'http://localhost:3000/';
        await driver.get(loginUrl);

        await driver.findElement(By.id('username')).sendKeys('user1');
        await driver.findElement(By.id('password')).sendKeys('wrongPass');
        await driver.findElement(By.id('submit')).click();
   
        const errorMessage = await driver.findElement(By.id('errorMessage')).getText();
        
        await driver.quit();

        expect(errorMessage).to.equal('The username or password you\'ve entered is incorrect. Please try again'); 
    });

    it('As an applicant, when I am able to log out when I click the logout button', async () => {
        const driver = new Builder().
        withCapabilities(Capabilities.chrome()).
        build();

        const loginUrl = 'http://localhost:3000/';
        await driver.get(loginUrl);

        await driver.findElement(By.id('username')).sendKeys('user1');
        await driver.findElement(By.id('password')).sendKeys('user1');
        await driver.findElement(By.id('submit')).click();
        await driver.findElement(By.id('logoutButton')).click();

        const redirectUrl = await driver.getCurrentUrl();
        await driver.quit();

        expect(redirectUrl).to.equal(baseUrl);                
    });
});