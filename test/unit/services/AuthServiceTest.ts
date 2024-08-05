import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { URL, getToken } from "../../../src/services/AuthService";
import { LoginRequest } from "../../../src/models/LoginRequest";
import { expect } from 'chai';

const mock = new MockAdapter(axios);

const token = `
eyJhbGciOiJIUzI1NiJ9.
eyJpYXQiOjE3MjI4NjM2MzEsImV4cCI6MTcyMjg2MzYzMSwiUm9sZSI6MSwic3ViIjoidXNlcjEiLCJpc3MiOiJLYWlub3MgSm9iIFJvbGUgTWFuYWdlciJ9.
XuZH9clgCVeD5FS6x-JvfsUL73FrDQqgrhyR7fDjfo8
`
// FIX ME: Write service test
describe('AuthService', function () {
    describe('getToken', function () {
        it.only('should return token if a token is returned from server', async () => {
            const loginRequest: LoginRequest = {
                "username": "user1",
                "password": "user1"
            }
            
            const baseURL = "http://localhost:8080/"
            mock.onPost("http://localhost:8080/api/auth/login").reply(200, token);

            const results = await getToken(loginRequest);

            expect(results).to.equal(token);
        })
    })
})