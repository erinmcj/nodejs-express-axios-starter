import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import { getAllOpenJobRoles, URL } from '../../../src/services/JobRoleService';
import { expect } from 'chai';

const jobRoleResponse: JobRoleResponse = {
    roleId: 1,
    roleName: "Software Developer",
    location: "Toronto, CA",
    capability: "Digital Services",
    band: "Trainee",
    closingDate: "2024-08-15 23:59:59",
    roleStatus: 1
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
})
