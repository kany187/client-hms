import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";

const apiClient = new APIClient<Employee>('/hospital/emp');

export interface Employee {
    _id?: string,
    firstName: string,
    lastName: string,
    isManager: boolean
}

const useEmployee = () => useQuery({
    queryKey: ['employees'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h
  
  })

export default useEmployee;