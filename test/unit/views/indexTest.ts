import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";
import * as cheerio from 'cheerio';

describe('pageTemplate.njk', () => {
    const templateFile = 'pageTemplate.njk';
    
    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should contain the expected image paths', () => {
        const context = {};
        const renderedHtml = nunjucks.render(templateFile, context);

        const expectedImagePaths = [
            'images/Green_Circle_Favicon.png',
            'images/Kainos_Logo_Blue_Transparent.png',
            'images/Kainos-Logo_White_Transparent.png',
            'images/Flux_White_Footer.png'
        ];

        expectedImagePaths.forEach((expectedSrc) => {
            expect(renderedHtml).to.include(expectedSrc);
        });
    });

    it('should use the correct style sheet', () => {
        const context = {};
        const renderedHtml = nunjucks.render(templateFile, context);
        const $ = cheerio.load(renderedHtml);

        const expectedStyleSheets = [
            '/style.css'
        ];

        const styleLinkTags = $('[rel="stylesheet"]');
        const actualStyleSheets = styleLinkTags.map((i, styleTag) => {
            return $(styleTag).attr('href');
        }).get();
        
        console.log(actualStyleSheets);
        expect(expectedStyleSheets).to.eql(actualStyleSheets);
    });

    it('should display correct contact information', () => {
        const context = {};
        const renderedHtml = nunjucks.render(templateFile, context);

        const expectedContactInfo = 'Contact us: kainos@kainos.com';

        expect(renderedHtml).to.include(expectedContactInfo);
    });
});
