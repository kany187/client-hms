import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Department } from "./useDepartment";

const apiClient = new APIClient<Department>('/department');

const useAddDepartment = () => {
    const queryClient =  useQueryClient();

    return useMutation<Department, Error, Department>({
         mutationFn: apiClient.post,
     onSuccess: (savedDepartment, newDepartment) => {
         console.log(savedDepartment);
 
         queryClient.invalidateQueries({
             queryKey: ['departments']
         })
     }
     })
}

export default useAddDepartment;
