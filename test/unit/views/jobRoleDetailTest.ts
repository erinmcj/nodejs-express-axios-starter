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

    it('should display individual job role information when the job role exists in the db', () => {
        const context = {
            jobRole: 
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1, description: "full stack", responsibilities: "coding", jobLink: "www.softwareengineer.com" }
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const $ = cheerio.load(renderedHtml);

        const listItems = $('tr > td');

        const items = listItems.map((index, el) => {
        return $(el).text().trim();
        }).get();

        const expectedData = [
            'Software Engineer',
            'Toronto',
            'Development',
            'B2',
            '2024-08-01',
            'Open',
            'full stack',
            'coding',
            'Job Specification'
          ];

        expect(items).to.deep.equal(expectedData);

    });

    it('should display open status for an individual job role with role status of 1', () => {
        const context = {
            jobRole: 
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1, description: 'full stack', responsibilities: 'coding', jobLink: 'www.softwareengineer.com' },
        }; 
        
        const renderedHtml = nunjucks.render(templateFile, context);

        const expectedHtml = 
        `<td>
            
            Open
            
        </td>`;

        expect(renderedHtml).to.include(expectedHtml);
    });

    it('should display closed status for an individual job role with role status of 0', () => {
        const context = {
            jobRole:
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 0, description: 'full stack', responsibilities: 'coding', jobLink: 'www.softwareengineer.com' },
        };

        const renderedHtml = nunjucks.render(templateFile, context);
        const expectedHtml = 
        `<td>
            
            Closed
            
        </td>`
       
        expect(renderedHtml).to.include(expectedHtml);
    });

});
