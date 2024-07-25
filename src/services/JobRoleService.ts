import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "/api/job-roles";

export const getAllOpenJobRoles = async (): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        if (e.response.status == 500) {
            throw new Error('Could not get job roles');
        } else {
            throw new Error(e.message);
        }
    }
}