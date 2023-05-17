import APIClient, { setJwt } from "../api-client";
import jwtDecode from "jwt-decode";

const apiClient = new APIClient<User>('/auth');

export interface User {
    email: string,
    password: string
}

setJwt(getJwt());

class AuthService{
   async login(user: User){
        return apiClient.post(user);
    }
}

export function logout(){
    localStorage.removeItem('token');
}

export function getCurrentUser(){
    try {
        const jwt: any = localStorage.getItem("token");
        return jwtDecode(jwt);
      } catch (ex) {
        return null
      }
}

export function getJwt(){
    return localStorage.getItem('token');
}

export default new AuthService();

