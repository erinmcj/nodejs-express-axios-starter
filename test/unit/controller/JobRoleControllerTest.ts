import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";

import { expect } from 'chai';
import sinon from 'sinon';
import { Request } from "express";
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


describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getOpenJobRoles', function () {
        it('should render view with list of job roles when list of job roles returned', async () => {
            const jobRolesList = [jobRoleResponse];

            sinon.stub(JobRoleService, 'getAllOpenJobRoles').resolves(jobRolesList);
            
            const req = { } as Request;
            const res = { render: sinon.spy() }; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await JobRoleController.getOpenJobRoles(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html', { roles: jobRolesList })).to.be.true;
        });

        it('should render view with no jobs found message when empty list of job roles returned', async () => {
            const emptyJobRoles: JobRoleResponse[] = [];

            sinon.stub(JobRoleService, 'getAllOpenJobRoles').resolves(emptyJobRoles);

            const req = { } as Request;
            const res = { render: sinon.spy() } ; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await JobRoleController.getOpenJobRoles(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html', { roles: emptyJobRoles })).to.be.true;
        })

        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = 'Error message';

            sinon.stub(JobRoleService, 'getAllOpenJobRoles').rejects(new Error(errorMessage));

            const req = {} as Request;
            const res = { render: sinon.spy(), locals: { errorMessage: errorMessage }}; /* eslint-disable  @typescript-eslint/no-explicit-any */

            await JobRoleController.getOpenJobRoles(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html')).to.be.true;
            expect(res.locals.errorMessage).to.equal(errorMessage);
        });
    })

    describe('getJobRoleById', function () {
        it('should render view with correct job role when service returns a job role', async() => {
            sinon.stub(JobRoleService, 'getJobRoleById').resolves(jobRoleDetailResponse);

            const req = { params: "2" };
            const res = { render: sinon.spy() };

            await JobRoleController.getJobRole(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('job-role-detail.html', { jobRole: jobRoleDetailResponse})).to.be.true;
        });

        it('should return an error when service returns error', async() => {
            const errorMessage: string = 'Error message';
            sinon.stub(JobRoleService, 'getJobRoleById').rejects(new Error(errorMessage));

            const req = { params: "2" };
            const res = { render: sinon.spy(), locals: { errormessage: ''} };

            await JobRoleController.getJobRole(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('job-role-detail.html')).to.be.true;
            expect(res.locals.errormessage).to.equal(errorMessage);
        });

    })
})