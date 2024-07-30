import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";

describe('index.html', () => {
    const templateFile = 'index.html';
    
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

        const expectedStyleSheet = 'style.css';

        expect(renderedHtml).to.include(expectedStyleSheet);
    });

    it('should display correct contact information', () => {
        const context = {};
        const renderedHtml = nunjucks.render(templateFile, context);

        const expectedContactInfo = 'Contact us: kainos@kainos.com';

        expect(renderedHtml).to.include(expectedContactInfo);
    });
});
