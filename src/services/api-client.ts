import axios, { AxiosRequestConfig} from 'axios';
import config from "./config.json";
import { getJwt } from './user/auth-service';

const axiosInstance = axios.create({
    baseURL: config.apiUrl
})



class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
       return axiosInstance
       .get<T[]>(this.endpoint, config)
       .then(res => res.data);
    }

    get = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data)
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data)
    }

    put = (id: number | string, data: T) => {
        return axiosInstance
        .put<T>(this.endpoint + '/' + id, data)
        .then(res => res.data)
    }

    delete = (id: number | string) => {
        return axiosInstance
        .delete<T>(this.endpoint + '/' + id)
        .then(res => res.data)
    }
}

export function setJwt(jwt: any) {
    axios.defaults.headers.common['token'] = jwt;
}

export default APIClient;
