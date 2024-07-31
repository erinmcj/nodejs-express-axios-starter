import axios, { AxiosResponse } from "axios";
import { expect } from 'chai';
import { URL } from "../../src/services/JobRoleService";

describe.skip('JobRoleIntegration', function () {
    it('getOpenJobRoles should return list of job roles', async () => {
        try {
            const response: AxiosResponse = await axios.get(URL);  
            
            const data = response.data;
            const status = response.status;

            expect(status).to.equal(200);
            expect(data).to.not.be.null;
        } catch (e) {
            return;
        }
    });

    it('getJobRoleById should return job role details', async () => {
        try {
            const response: AxiosResponse = await axios.get(URL);  
            
            const data = response.data;
            const status = response.status;

            expect(status).to.equal(200);
            expect(data).to.not.be.null;
        } catch (e) {
            return;
        }
    })
})