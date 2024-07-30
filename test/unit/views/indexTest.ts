import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";

//TODO: what meaningful tests can we write for index.html? Is it even needed?
describe('index.html', () => {
    it('should contain the expected image paths', () => {
        const viewsPath = path.resolve(__dirname, '../../../views');
        nunjucks.configure(viewsPath, { autoescape: true });

        const templateFile = 'index.html';
        const context = {};

        const renderedHtml = nunjucks.render(templateFile, context);

        const expectedImagePaths = [
            'images/Kainos_Logo_Blue_Transparent.png',
            'images/Kainos-Logo_White_Transparent.png',
        ];

        expectedImagePaths.forEach((expectedSrc) => {
            expect(renderedHtml).to.include(expectedSrc);
        });
    });
});


//TODO: probably needs to be a new file
//TODO: tests for other scenarios
//TODO: tests for more than 1 role? Assert how many table rows?
//TODO: looks like cheeriojs will help us traversing html: https://cheerio.js.org/docs/basics/loading maybe helpful??
//TODO: is there any work to have these tests run using npm commands?
describe('list-job-roles.html', () => {
    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should display job roles when roles are provided', () => {
        const templateFile = 'list-job-roles.html';
        const context = {
            roles: [
                { roleName: 'Software Engineer', location: 'Toronto', capability: 'Development', band: 'B2', closingDate: '2024-08-01', roleStatus: 1 },
            ]
        };

        const renderedHtml = nunjucks.render(templateFile, context);

        expect(renderedHtml).to.include('<td>Software Engineer</td>');
    });
});
