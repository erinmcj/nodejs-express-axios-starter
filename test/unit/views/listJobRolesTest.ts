import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";
import * as cheerio from 'cheerio';

//TODO: looks like cheeriojs will help us traversing html: https://cheerio.js.org/docs/basics/loading maybe helpful??
//TODO: is there any work to have these tests run using npm commands?
describe('list-job-roles.html', () => {
    const templateFile = 'list-job-roles.html';

    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should display correct number of job roles when multiple roles are provided', () => {
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1 },
                { roleName: 'Product Owner', location: 'Toronto', capability: 'Business', band: 'B3', closingDate: '2024-08-01', roleStatus: 1 },
                { roleName: 'Manager', location: 'Toronto', capability: 'Management', band: 'B1', closingDate: '2024-08-01', roleStatus: 1 },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const $ = cheerio.load(renderedHtml);

        const actualNumDataRows = $('table').find('tr').length - 1; // exclude header row
        const expectedNumDataRows = context.roles.length;

        expect(actualNumDataRows).to.equal(expectedNumDataRows);
    });

    it('should display no open job roles message when no roles are provided', () => {
        const context = { };

        const renderedHtml = nunjucks.render(templateFile, context);

        expect(renderedHtml).to.include('There are no job roles open.');
    });

    it('should display error message when error is provided', () => {
        const context = { errormessage: "Error message" };

        const renderedHtml = nunjucks.render(templateFile, context);

        expect(renderedHtml).to.include('<h2 style="color:red;font-weight:bold;">Error message</h2>');
    });

    it('should display open status for job roles with role status of 1', () => {
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1 },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const expectedHtml = 
        `<td>
            
            Open
            
        </td>`

        expect(renderedHtml).to.include(expectedHtml);
    });

    it('should display closed status for job roles with role status of 0', () => {
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
