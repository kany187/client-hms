import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Role>('/staff');

export interface Role {
    _id: string,
    role: string,
    status: string,
     employeeId: any;
     deptName: string;
    
  }

const useRole = () => useQuery({
  queryKey: ['roles'],
  queryFn: apiClient.getAll,
  staleTime: 24 * 60 * 60 * 1000 //24h

})

export default useRole;