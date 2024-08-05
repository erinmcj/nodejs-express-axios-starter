import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "api/auth/login";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const response: AxiosResponse = await axios.post(URL, loginRequest);
        console.log(response.data);
        return response.data;
    } catch (e) {
        if (!e.response) {
            throw new Error('The login service is currently unavailable. Please try again later.');
        }

        if (e.response.status == 500) {
            throw new Error('The login service is currently unavailable. Please try again later.');
        } else if (e.response.status == 400) {
            throw new Error('The password or username you\'ve entered is incorrect. Please try again');
        } else {
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
}
