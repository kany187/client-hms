import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Staff } from "./useStaffInfo";

const apiClient = new APIClient<Staff>('/staff');


 const useStaff = () => useQuery({
    queryKey: ['staffs'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000 //24h
  
  })

export default useStaff;
