import express from "express";
import { getAllOpenJobRoles } from "../services/JobRolesService"

export const getOpenJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('list-job-roles.html', { roles: await getAllOpenJobRoles() });
}