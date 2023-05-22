import APIClient, {setJwt} from "../api-client";
import jwtDecode from "jwt-decode";

const apiClient = new APIClient<User>('/auth');
const tokenKey = "token";

export interface User {
    email: string,
    password: string
}

setJwt(getJwt());

export async function login(user: User){
    return apiClient.post(user);
}

export function loginWithJwt(jwt: any){
    localStorage.setItem(tokenKey, jwt)
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try {
        const jwt: any = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (ex) {
        return null
      }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}


const auth = {
    login,
    loginWithJwt,
    getJwt,
    getCurrentUser,
    logout
};

export default auth;

