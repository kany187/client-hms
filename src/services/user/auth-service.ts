import APIClient, {setJwt} from "../api-client";
import jwtDecode from "jwt-decode";
import { User } from "../../types";

const apiClient = new APIClient<LoginUser>('/auth');
const tokenKey = "token";

export interface LoginUser {
    email: string,
    password: string
}

// Initialize JWT if available
const jwt = getJwt();
if (jwt) {
    setJwt(jwt);
}

export async function login(user: LoginUser){
    return apiClient.post(user);
}

export function loginWithJwt(jwt: string){
    localStorage.setItem(tokenKey, jwt);
    setJwt(jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(): User | null {
    try {
        const jwt = localStorage.getItem(tokenKey);
        if (!jwt) return null;
        return jwtDecode(jwt) as User;
      } catch (ex) {
        return null;
      }
}

export function getJwt(): string | null {
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

