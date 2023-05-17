import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Patient } from "./usePatient";

const apiClient = new APIClient<Patient>('/patient');

const usePatientDelete = (_id: string) => {
    const queryClient =  useQueryClient();
    
    const deletePatient = async () => {
        await apiClient.delete(_id)
    }
    return useMutation(deletePatient, {
     onSuccess: () => {
         queryClient.invalidateQueries({
             queryKey: ['patients']
         })
     }
     })
 }

export default usePatientDelete