import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Department>('/department');

export interface Department {
    _id?: string,
    deptName: string,
    hospitalId: any,
    phone: string,
    deptHead: string,
}

const useDepartment = () => useQuery({
    queryKey: ['departments'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h

})

export default useDepartment;