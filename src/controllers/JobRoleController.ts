import express from "express";
import { getAllOpenJobRoles } from "../services/JobRoleService"

export const getOpenJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('list-job-roles.html', { roles: await getAllOpenJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('list-job-roles.html');
    }
}