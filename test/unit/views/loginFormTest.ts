import path from "path";
import {expect} from 'chai';
import nunjucks from "nunjucks";
import * as cheerio from 'cheerio';

describe ('loginForm.html', () => {
    const templateFile = 'loginForm.html';

    const viewsPath = path.resolve(__dirname, '../../../views');
    nunjucks.configure(viewsPath, { autoescape: true });

    it('should display input box with username label', () => {
        const renderedHtml = nunjucks.render(templateFile);
        const $ = cheerio.load(renderedHtml);

        const labelUsername = $('label[for="username"]');
        expect(labelUsername).to.not.be.null;

        const labelText = labelUsername.text();
        expect(labelText).to.equal('Username');

        const usernameInputBox = $('input[id="username"]');
        expect(usernameInputBox).to.not.be.null;
    });

    it('should display input box with password label', () => {
        const renderedHtml = nunjucks.render(templateFile);
        const $ = cheerio.load(renderedHtml);

        const labelPassword = $('label[for="password"]');
        expect(labelPassword).to.not.be.null;

        const labelText = labelPassword.text();
        expect(labelText).to.equal('Password');

        const passwordInputBox = $('input[id="password"]');
        expect(passwordInputBox).to.not.be.null;
    });

    it('should display login button', () => {
        const renderedHtml = nunjucks.render(templateFile);
        const $ = cheerio.load(renderedHtml);

        const loginButton = $('button[id="submit"]');
        expect(loginButton).to.not.be.null;

        const loginButtonText = loginButton.text();
        expect(loginButtonText).to.equal('Login');
    });


})