import { useQuery } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Employee } from "./useEmployee";


const apiClient = new APIClient<Employee>('/hospital/emp');

const useEmployeeId = (_id: string) => useQuery({
    queryKey: ['employees', _id],
    queryFn: () => apiClient.get(_id)
  })

export default useEmployeeId;