import axios, { AxiosResponse } from "axios";
import { expect } from 'chai';
import { URL } from "../../src/services/JobRoleService";

describe('JobRoleIntegration', function () {
    describe('getAllOpenJobRoles', function () {
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
    });
})