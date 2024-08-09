import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getAllOpenJobRoles, URL, getJobRoleById } from '../../../src/services/JobRoleService';
import { expect } from 'chai';
import { JobRoleDetailResponse } from "../../../src/models/JobRoleDetailResponse";

const jobRoleResponse: JobRoleResponse = {
    roleId: 1,
    roleName: "Software Developer",
    location: "Toronto, CA",
    capability: "Digital Services",
    band: "Trainee",
    closingDate: "2024-08-15 23:59:59",
    roleStatus: 1
}

const jobRoleDetailResponse: JobRoleDetailResponse = {
    roleId: 2,
    roleName: "Product Owner",
    location: "Toronto, CA",
    capability: "Digital Services",
    band: "Trainee",
    closingDate: "2024-08-15 23:59:59",
    roleStatus: 1,
    description: "Oversees products.",
    responsibilities: "planning, organizing",
    jobLink: "https://kainoscareerportal.com/ProductOwner"
}

const mock = new MockAdapter(axios);

describe('JobRoleService', function () {
    describe('getAllOpenJobRoles', function () {
        it('should return job roles from response', async () => {
            const data = [jobRoleResponse];

            mock.onGet(URL).reply(200, data);

            const results = await getAllOpenJobRoles();

            expect(results[0]).to.deep.equal(jobRoleResponse);
        });

        it('should return empty list of job roles when response returns empty list', async () => {
            const data: JobRoleResponse[] = [];

            mock.onGet(URL).reply(200, data);
            
            const results = await getAllOpenJobRoles();

            expect(results).to.deep.equal(data);
        });

        it('should throw exception when 500 when error returned from axios', async () => {
            mock.onGet(URL).reply(500);

            try {
                await getAllOpenJobRoles();
            } catch (e) {
                expect(e.message).to.equal('Could not get job roles');
                return;
            }
        })
    })

    describe('getJobRoleById', function () {
        it('should return job with correct id', async () => {

            mock.onGet(URL + "/2").reply(200, jobRoleDetailResponse);

            const result = await getJobRoleById(2);

            expect(result).to.deep.equal(jobRoleDetailResponse);
        })

        it('should return exception when 500 error returned from axios', async () => {
            mock.onGet(URL + "/2").reply(500);

            try {
                await getJobRoleById(2);
            } catch (e) {
                expect(e.message).to.equal('We encountered a problem while trying to retrieve this job role. Please try again later!');
                return;
            }
        })
    })
})
