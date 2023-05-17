import axios, { AxiosResponse } from "axios";
import APIClient from "../api-client";

const apiClient = new APIClient<User>('/users');

export interface User {
    email: string,
    password: string,
}

// interface CreateUserResponse extends AxiosResponse {
//     headers: {
//       token: string;
//     };
//   }

class UserService {
   
    register(user: User){
        return apiClient.post(user);
    }
} 

export default new UserService();
