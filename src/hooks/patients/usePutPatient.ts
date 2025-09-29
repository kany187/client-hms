import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../../services/api-client";
import { Patient } from "../../types";

const apiClient = new APIClient<Patient>('/patient');

const usePutPatient = (_id: string) => {

    const queryClient =  useQueryClient();
    
    const updatePatient = async (data: Patient) => {
        await apiClient.put(`${_id}`, data)
    }
    return useMutation(updatePatient, {
     onSuccess: (data) => {
         queryClient.invalidateQueries({
             queryKey: ['patients']
         })
     }
     })
}

export default usePutPatient;