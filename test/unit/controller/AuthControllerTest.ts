import { LoginResponse } from "../../../src/models/LoginResponse";
import * as AuthService from "../../../src/services/AuthService";
import * as AuthController from "../../../src/controllers/AuthController";

import { expect } from 'chai';
import sinon from 'sinon';
import { Request } from "express";
import { LoginRequest } from "../../../src/models/LoginRequest";

const loginResponse: LoginResponse = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjI4NjM2MzEsImV4cCI6MTcyMjg2MzYzMSwiUm9sZSI6MSwic3ViIjoidXNlcjEiLCJpc3MiOiJLYWlub3MgSm9iIFJvbGUgTWFuYWdlciJ9.XuZH9clgCVeD5FS6x-JvfsUL73FrDQqgrhyR7fDjfo8'
}

const loginRequest: LoginRequest = {
    username: "user1",
    password: "user1"
}

describe('AuthController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getLoginForm', function () {
        it('should render login form view', async () => {
            const req = { } as Request;
            const res = { render: sinon.spy() }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.getLoginForm(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm.html')).to.be.true;
        });
    });

    describe('postLoginForm', function () {
        it('should set session token after service returns token', async () => {
            sinon.stub(AuthService, 'getToken').resolves(loginResponse.token);
            
            const req = {
                body: { loginRequest },
                session: {
                    token: ''
                }
            } as Request;

            const res = { 
                render: sinon.spy(),
                redirect: sinon.spy(),
                locals: {}
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLoginForm(req, res as any);
            
            expect(req.session.token).to.equal(loginResponse.token);
        });

        it('should redirect to job roles page after service returns token', async () => {
            sinon.stub(AuthService, 'getToken').resolves(loginResponse.token);
            
            const req = {
                body: { loginRequest },
                session: {
                    token: ''
                }
            } as Request;

            const res = { 
                render: sinon.spy(),
                redirect: sinon.spy(),
                locals: {}
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLoginForm(req, res as any);
            
            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/job-roles')).to.be.true;
        });

        it('should redirect to job roles page with error message if service returns empty token', async () => {
            sinon.stub(AuthService, 'getToken').resolves(loginResponse.token);
            
            const req = {
                body: { loginRequest },
                session: {
                    token: ''
                }
            } as Request;

            const res = { 
                render: sinon.spy(),
                redirect: sinon.spy(),
                locals: {}
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLoginForm(req, res as any);
            
            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/job-roles')).to.be.true;
        });

        it('should render login page after service returns error', async () => {
            const errMessage = 'Error Message';
            
            sinon.stub(AuthService, 'getToken').rejects(new Error(errMessage));
            
            const req = {
                body: { loginRequest },
                session: {
                    token: ''
                }
            } as Request;

            const res = { 
                render: sinon.spy(),
                redirect: sinon.spy(),
                locals: { errorMessage: errMessage }
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLoginForm(req, res as any);
            
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('loginForm.html')).to.be.true;
            expect(res.locals.errorMessage).to.equal(errMessage);
        });
    });

    describe('postLogout', function () {
        it('should destroy a session if it exists and remove token cookie from client browser', async () => {            
            const destroyStubWithSuccessfulResolve = sinon.stub().callsArg(0);
       
            const req = {
                session: {
                    token: loginResponse.token,
                    destroy: destroyStubWithSuccessfulResolve
                }
            } as unknown as Request;

            const res = { 
                clearCookie: sinon.spy(),
                redirect: sinon.spy(),
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLogout(req, res as any);

            expect(destroyStubWithSuccessfulResolve.calledOnce).to.be.true;
            expect(res.clearCookie.calledOnce).to.be.true;
            expect(res.clearCookie.calledWith('connect.sid')).to.be.true;
            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });

        it('should render list job roles page with error message if we cannot destory session', async () => {     
            const errMessage = 'Unable to log out. Please try again';       
            const destroyStubWithUnsuccessfulResolve = sinon.stub().callsArgWith(0, new Error(errMessage));
       
            const req = {
                session: {
                    token: loginResponse.token,
                    destroy: destroyStubWithUnsuccessfulResolve
                }
            } as unknown as Request;
            
            const res = { 
                redirect: sinon.spy(),
                render: sinon.spy(),
                locals: { errorMessage: errMessage },
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLogout(req, res as any);

            expect(destroyStubWithUnsuccessfulResolve.calledOnce).to.be.true;
            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html')).to.be.true;
            expect(res.locals.errorMessage).to.equal(errMessage);
        });

        it('should redirect to login page if session does not exist', async () => {            
            const req = { } as unknown as Request;
            const res = { 
                redirect: sinon.spy()
            }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await AuthController.postLogout(req, res as any);

            expect(res.redirect.calledOnce).to.be.true;
            expect(res.redirect.calledWith('/')).to.be.true;
        });
    })
})

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}
