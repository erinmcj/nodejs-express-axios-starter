import axios, { AxiosResponse } from "axios";

export const getAllOpenJobRoles = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/job-roles");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get databases');
    }
}