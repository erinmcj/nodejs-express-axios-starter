import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {getToken} from "../../../src/services/AuthService";
import {LoginRequest} from "../../../src/models/LoginRequest";
import {expect} from 'chai';

describe('AuthService', () => {
    describe('getToken', () => {
        let mock: MockAdapter;

        const URL = "api/auth/login";
        const loginResponse = {token: 'fakeToken'};
        const loginRequest: LoginRequest = {
            username: "username",
            password: "password"
        };

        before(() => {
            mock = new MockAdapter(axios);
        });

        afterEach(() => {
            mock.reset();
        });

        after(() => {
            mock.restore();
        });

        it('should return token when a token is returned from server', async () => {
            mock.onPost(URL).reply(200, loginResponse);

            const results = await getToken(loginRequest);
            expect(results).to.equal(loginResponse.token);
        });

        it('should throw error for incorrect username or password', async () => {
            mock.onPost(URL).reply(401);

            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal('The username or password you\'ve entered is incorrect. Please try again');
            }
        });

        //TODO: this one fails because in the service code you add the exception
        it('should throw exception if server error is received', async () => {
            mock.onPost(URL).reply(500);

            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal('The login service is currently unavailable. Please try again later.');
            }
        });
    });
})
