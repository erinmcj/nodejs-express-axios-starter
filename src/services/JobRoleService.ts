import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";
import { JobRoleDetailResponse } from "../models/JobRoleDetailResponse";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "/api/job-roles";

export const getAllOpenJobRoles = async (): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL);

        return response.data;
    } catch (e) {
        if (e.response.status == 500) {
            throw new Error('Could not get job roles');
        } else {
            throw new Error(e.message);
        }
    }
}

export const getJobRoleById = async function (id: string): Promise <JobRoleDetailResponse> {
    try {
        const response: AxiosResponse = await axios.get(URL + "/" + id);
        return response.data;

    } catch (e) {
        throw new Error("Could not get job role");
    }
}