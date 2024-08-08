import { LoginRequest } from "../models/LoginRequest";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080/";

export const URL: string = "api/auth/login";

export const getToken = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        console.log("In service (req): " + loginRequest);
        console.log("In service (url): " + axios.defaults.baseURL + URL);
        const response: AxiosResponse = await axios.post(URL, loginRequest);
        
        return response.data.token;
    } catch (e) {
        const statusCode = e.response.status;

        if (statusCode == 422 || statusCode == 401 || statusCode == 400) {
            throw new Error('The username or password you\'ve entered is incorrect. Please try again');
        } else {
            
            throw new Error('The login service is currently unavailable. Please try again later. ' + statusCode);  
        }       
    }
}