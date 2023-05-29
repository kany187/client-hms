import axios, { AxiosRequestConfig} from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export function setJwt(jwt: any) {
    axiosInstance.defaults.headers.common["x-auth-token"] = jwt;
}

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

    getMe = () => {
        return axiosInstance
        .get<T[]>(this.endpoint)
        .then(res => res.data)
       
    }

    get = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data)
    }

    getById = (id: number | string) => {
        return axiosInstance
            .get<T[]>(this.endpoint + '/' + id)
            .then(res => res.data)
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then(res => res.data)
    }

    postH = <T>(data: T): Promise<{data: T[]; headers: any; request: any}> => {
        return axiosInstance
       .post<T[]>(this.endpoint, data)
       .then((res) =>  {
            return {
                data: res.data,
                headers: res.headers,
                request: res.request,
            }
       });
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



export default APIClient;

