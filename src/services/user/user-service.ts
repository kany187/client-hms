import APIClient from "../api-client";

const apiClient = new APIClient<User>('/users');

export interface User {
    email: string,
    password: string,
}

export function register(user: User){
    return apiClient.postH(user);
}

const user =  {
    register
}

export default user;
