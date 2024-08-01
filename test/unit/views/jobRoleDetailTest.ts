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

});
