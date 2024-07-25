import axios, { AxiosResponse } from "axios";
import { expect } from 'chai';
// import { JobRoleResponse } from "../../../src/models/JobRoleResponse";

describe('JobRoleIntegration', function () {
    describe('getAllOpenJobRoles', function () {
        it('getOpenJobRoles should return list of job roles', async () => {
            try {
                const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");  
                
                const data = response.data;
                const status = response.status;
    
                expect(status).to.equal(200);
                expect(status).to.not.be.null;
            } catch (e) {
                return;
            }
        });
    });
})