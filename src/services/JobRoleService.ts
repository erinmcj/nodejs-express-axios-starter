import axios, { AxiosResponse } from "axios";
import { JobRoleResponse } from "../models/JobRoleResponse";

export const getAllOpenJobRoles = async (): Promise<JobRoleResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        throw new Error('Could not get job roles');
    }
}