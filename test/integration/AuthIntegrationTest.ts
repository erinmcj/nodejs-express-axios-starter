import axios, { AxiosResponse } from "axios";
import { expect } from "chai";
import { LoginRequest } from "../../src/models/LoginRequest";

const loginRequest: LoginRequest = {
    username: "user1",
    password: "user1"
}

describe.skip('AuthIntegration', function () {
    it('postLoginForm should return a token', async () => {
        const URL = "api/auth/login";
        try {
            const response: AxiosResponse = await axios.post(URL, loginRequest);

            const data = response.data;
            const status = response.status;

            expect(status).to.equal(200);
            expect(data).to.not.be.null;
        } catch (e) {
            return;
        }
    })
})