import { JobRoleResponse } from "../../../src/models/JobRoleResponse";
import * as JobRoleService from "../../../src/services/JobRoleService";
import * as JobRoleController from "../../../src/controllers/JobRoleController";

import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from "express";

const jobRoleResponse: JobRoleResponse = {
    roleId: 1,
    roleName: "Software Developer",
    location: "Toronto, CA",
    capability: "Digital Services",
    band: "Trainee",
    closingDate: "2024-08-15 23:59:59",
    roleStatus: 1
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
            const res = { render: sinon.spy() };

            await JobRoleController.getOpenJobRoles(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html', { roles: jobRolesList })).to.be.true;
        });

        it('should render view with error message when error thrown', async () => {
            const errorMessage: string = 'Error message';

            sinon.stub(JobRoleService, 'getAllOpenJobRoles').rejects(new Error(errorMessage));

            const req = {} as Request;
            const res = { render: sinon.spy(), locals: { errorMessage: errorMessage }};

            await JobRoleController.getOpenJobRoles(req, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('list-job-roles.html')).to.be.true;
            expect(res.locals.errorMessage).to.equal(errorMessage);
        });
    })
})