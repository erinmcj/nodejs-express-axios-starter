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

    it('As an applicant, I can click on a job link and be taken to the correct page', async () => {
        const driver = new Builder().
        withCapabilities(Capabilities.chrome()).
        build();

        const originalWindowHandle = await driver.getWindowHandle();

        const endPoint: string = 'job-roles/1';
        await driver.get(baseUrl + endPoint);

        const expectedUrl = "https://login.microsoftonline.com/";


        await driver.findElement(By.linkText("Job Specification")).click();

        const newWindowHandles = await driver.getAllWindowHandles();
        const newWindowHandle = newWindowHandles.find(handle => handle !== originalWindowHandle);
        await driver.switchTo().window(newWindowHandle as string);


        const actualUrl = await driver.getCurrentUrl();
        console.log("actual URL: " + actualUrl);
        expect(actualUrl).to.include(expectedUrl);

        await driver.quit();

    });
});