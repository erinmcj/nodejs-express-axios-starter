import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "api/auth/login";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        const response: AxiosResponse = await axios.post(URL, loginRequest);

        const token = response.data.token;
        if (!token) {
            throw new Error('The login service is currently unavailable. Please try again later.');
        }

        return token;
    } catch (e) {
        const statusCode = e.response.status;
        const clientErrorCodes = [422, 401, 400];

        if (clientErrorCodes.includes(statusCode)) {
            throw new Error('The username or password you\'ve entered is incorrect. Please try again');
        } else {
            throw new Error('The login service is currently unavailable. Please try again later.');  
        }       
    }
}
