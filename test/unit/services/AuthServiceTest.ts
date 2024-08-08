import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getToken } from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";
import { expect } from 'chai';
import { LoginResponse } from "../../../src/models/LoginResponse";

const loginResponse: LoginResponse = {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjI4NjM2MzEsImV4cCI6MTcyMjg2MzYzMSwiUm9sZSI6MSwic3ViIjoidXNlcjEiLCJpc3MiOiJLYWlub3MgSm9iIFJvbGUgTWFuYWdlciJ9.XuZH9clgCVeD5FS6x-JvfsUL73FrDQqgrhyR7fDjfo8'
}

const loginRequest: LoginRequest = {
    "username": "user1",
    "password": "user1"
}

const mock = new MockAdapter(axios);

describe('AuthService', function () {
    describe('getToken', function () {
        // FIX ME: getting login service unavailable error 404
        it.only('should return token when a token is returned from server', async () => {
            const URL = "api/auth/login";
            
            console.log("URL: " + axios.defaults.baseURL + URL);
            mock.onPost(URL).reply(200, loginResponse);

            const results = await getToken(loginRequest);
            expect(results).to.equal(loginResponse.token);           
        });

        it('should throw exception if server error is received', async () => {
            const URL = "api/auth/login";
        
            mock.onPost(URL).reply(500);

            try {
                await getToken(loginRequest);
            } catch (e) {
                expect(e.message).to.equal('The login service is currently unavailable. Please try again later.');
            }
        });
    })
})