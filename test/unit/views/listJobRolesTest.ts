import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";

//TODO: tests for other scenarios
//TODO: tests for more than 1 role? Assert how many table rows?
//TODO: looks like cheeriojs will help us traversing html: https://cheerio.js.org/docs/basics/loading maybe helpful??
//TODO: is there any work to have these tests run using npm commands?
describe('list-job-roles.html', () => {
    const templateFile = 'list-job-roles.html';

    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should display job roles when roles are provided', () => {
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1 },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        
        expect(renderedHtml).to.include('<td>Software Engineer</td>');
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

    it('should display open status for role status of 1 for job role', () => {
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

    it('should display closed status for role status of 0 for job role', () => {
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
