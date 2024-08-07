import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";
import * as cheerio from 'cheerio';

describe('job-role-detail.html', () => {
    const templateFile = 'job-role-detail.html';

    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should display error message when error is provided', () => {
        const context = { errormessage: "Error message" };

        const renderedHtml = nunjucks.render(templateFile, context);

        expect(renderedHtml).to.include('<h2 style="color:red;font-weight:bold;">Error message</h2>');
    });

    it('should display a job role when the job role exists in the db', () => {
        const context = {
            role: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1, description: "full stack", responsibilities: "coding", jobLink: "www.softwareengineer.com" }
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const $ = cheerio.load(renderedHtml);


        const headerRow = $('tr').eq(0);
        const dataRows = $('tr').not(headerRow);

        const actualNumDataRows = dataRows.length;
        const expectedNumDataRows = context.role.length;

        expect(actualNumDataRows).to.equal(expectedNumDataRows);

    });

    it('should display open status for a job role with role status of 1', () => {
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1, description: 'full stack', responsibilities: 'coding', jobLink: 'www.softwareengineer.com' },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const expectedHtml = 
        `<td>
            
            Open
            
        </td>`

        expect(renderedHtml).to.include(expectedHtml);
    });

    it('should display closed status for a job role with role status of 0', () => {
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 0 },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const expectedHtml = 
        `<td>
            
            Closed
            
        </td>`
       
        expect(renderedHtml).to.include(expectedHtml);
    });

});
